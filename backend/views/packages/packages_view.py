from pyramid.response import Response
from pyramid.view import view_config
from sqlalchemy import select, asc, desc
from sqlalchemy.exc import NoResultFound, IntegrityError
from db import Session
from models.package_model import Package
from models.destination_model import Destination
from helpers.jwt_validate_helper import jwt_validate
from pydantic import BaseModel, Field, ValidationError
from typing import List
from . import serialization_data
import uuid


class PackageRequest(BaseModel):
    destinationId: str
    name: str
    duration: int = Field(gt=0)
    price: float = Field(gt=0)
    itinerary: str
    maxTravelers: int = Field(gt=0)
    contactPhone: str
    images: List[str]


@view_config(route_name="packages", request_method="GET", renderer="json")
def get_packages(request):
    destination_id = request.params.get("destination")
    search_query = request.params.get("q") or request.params.get("search")
    min_price = request.params.get("minPrice")
    max_price = request.params.get("maxPrice")
    sort_by = request.params.get("sortBy")
    order = request.params.get("order", "asc")

    with Session() as session:
        stmt = select(Package)

        if destination_id and destination_id != "all":
            try:
                uuid.UUID(destination_id)
                stmt = stmt.where(Package.destination_id == destination_id)
            except ValueError:
                pass

        if search_query:
            stmt = stmt.where(Package.name.ilike(f"%{search_query}%"))

        if min_price:
            stmt = stmt.where(Package.price >= float(min_price))

        if max_price:
            stmt = stmt.where(Package.price <= float(max_price))

        if sort_by == "price":
            sort_column = Package.price
        elif sort_by == "duration":
            sort_column = Package.duration
        else:
            sort_column = Package.created_at

        if order == "desc":
            stmt = stmt.order_by(desc(sort_column))
        else:
            stmt = stmt.order_by(asc(sort_column))

        try:
            results = session.execute(stmt).scalars().all()
            return [serialization_data(pkg) for pkg in results]
        except Exception as e:
            print(f"Error fetching packages : {e}")
            return Response(json_body={"error": "Internal server error"}, status=500)


@view_config(route_name="packages", request_method="POST", renderer="json")
@jwt_validate
def create_package(request):
    if request.jwt_claims["role"] != "agent":
        return Response(
            json_body={"error": "Forbidden : Only agent can access"}, status=403
        )

    try:
        req_data = PackageRequest(**request.json_body)
    except ValidationError as err:
        return Response(json_body={"error": str(err.errors())}, status=400)

    with Session() as session:
        dest_stmt = select(Destination).where(Destination.id == req_data.destinationId)
        try:
            session.execute(dest_stmt).scalars().one()
        except NoResultFound:
            return Response(json_body={"error": "Destination id not found"}, status=400)

        try:
            agent_uuid = uuid.UUID(request.jwt_claims["sub"])
            dest_uuid = uuid.UUID(req_data.destinationId)
        except ValueError:
            return Response(json_body={"error": "Invalid UUID format"}, status=400)

        new_package = Package(
            agent_id=agent_uuid,
            destination_id=dest_uuid,
            name=req_data.name,
            duration=req_data.duration,
            price=req_data.price,
            itinerary=req_data.itinerary,
            max_travelers=req_data.maxTravelers,
            contact_phone=req_data.contactPhone,
            images=req_data.images,
        )

        try:
            session.add(new_package)
            session.commit()
            session.refresh(new_package)
            return serialization_data(new_package)
        except IntegrityError as err:
            session.rollback()
            return Response(json_body={"error": str(err.orig)}, status=409)
        except Exception as e:
            session.rollback()
            print(f"CRITICAL ERROR: {e}")
            return Response(
                json_body={"error": f"Internal Server Error: {str(e)}"}, status=500
            )
