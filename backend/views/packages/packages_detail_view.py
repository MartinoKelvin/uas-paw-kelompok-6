from pyramid.response import Response
from pyramid.view import view_config
from sqlalchemy import select
from sqlalchemy.exc import NoResultFound
from db import Session
from models.package_model import Package
from helpers.jwt_validate_helper import jwt_validate
from pydantic import BaseModel, ValidationError
from typing import Optional, List
from . import serialization_data


class PackageUpdateRequest(BaseModel):
    name: Optional[str] = None
    duration: Optional[int] = None
    price: Optional[float] = None
    itinerary: Optional[str] = None
    maxTravelers: Optional[int] = None
    contactPhone: Optional[str] = None
    images: Optional[List[str]] = None


@view_config(route_name="package_detail", request_method="GET", renderer="json")
def package_detail(request):
    pkg_id = request.matchdict.get("id")

    with Session() as session:
        try:
            stmt = select(Package).where(Package.id == pkg_id)
            pkg = session.execute(stmt).scalars().one()
            return serialization_data(pkg)
        except NoResultFound:
            return Response(json_body={"message": "Package not found"}, status=404)
        except Exception as e:
            print(f"Error detail package: {e}")
            return Response(
                json_body={"error": "Invalid ID or Server Error"}, status=400
            )


@view_config(route_name="package_detail", request_method="PUT", renderer="json")
@jwt_validate
def update_package(request):
    if request.jwt_claims.get("role") != "agent":
        return Response(
            json_body={"error": "Forbidden : Only agent can access"}, status=403
        )

    pkg_id = request.matchdict.get("id")

    try:
        req_data = PackageUpdateRequest(**request.json_body)
    except ValidationError as err:
        return Response(json_body={"error": str(err.errors())}, status=400)

    with Session() as session:
        stmt = select(Package).where(Package.id == pkg_id)
        try:
            pkg = session.execute(stmt).scalars().one()
        except NoResultFound:
            return Response(json_body={"message": "Package not found"}, status=404)

        if str(pkg.agent_id) != request.jwt_claims["sub"]:
            return Response(
                json_body={"error": "Forbidden: You do not own this package"},
                status=403,
            )

        update_data = req_data.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            if key == "maxTravelers":
                key = "max_travelers"
            if key == "contactPhone":
                key = "contact_phone"
            setattr(pkg, key, value)

        try:
            session.commit()
            session.refresh(pkg)
            return serialization_data(pkg)
        except Exception as e:
            session.rollback()
            print(e)
            return Response(json_body={"error": "Update failed"}, status=500)


@view_config(route_name="package_detail", request_method="DELETE", renderer="json")
@jwt_validate
def delete_package(request):
    if request.jwt_claims.get("role") != "agent":
        return Response(
            json_body={"error": "Forbidden : Only agent can access"}, status=403
        )

    pkg_id = request.matchdict.get("id")

    with Session() as session:
        stmt = select(Package).where(Package.id == pkg_id)
        try:
            pkg = session.execute(stmt).scalars().one()
        except NoResultFound:
            return Response(json_body={"error": "Package not found"}, status=404)

        if str(pkg.agent_id) != request.jwt_claims["sub"]:
            return Response(
                json_body={"error": "Forbidden: You dont own this package"}, status=403
            )

        try:
            session.delete(pkg)
            session.commit()
            return {"message": "Package Successfully Deleted"}
        except Exception as e:
            session.rollback()
            print(f"failed delete packged: {e}")
            return Response(
                json_body={
                    "error": "Cannot delete package, it might have booking sesssion"
                },
                status=409,
            )
