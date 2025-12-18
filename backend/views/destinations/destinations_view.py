from db import Session
from sqlalchemy import select
from sqlalchemy.exc import NoResultFound, IntegrityError
from typing import Optional
from pyramid.view import view_config
from pydantic import BaseModel, ValidationError
from pyramid.response import Response
from models.destination_model import Destination
from helpers.jwt_validate_helper import jwt_validate
import os
import uuid
from pathlib import Path


class DestinationFilterRequest(BaseModel):
    country: Optional[str] = None
    name: Optional[str] = None


class CreateDestinationRequest(BaseModel):
    name: str
    description: str
    photo_url: str
    country: str

def serialization_data(destination):
    return {
        "id": str(destination.id),
        "name": destination.name,
        "description": destination.description,
        "photoUrl": destination.photo_url,
        "country": destination.country,
    }


@view_config(route_name="destinations", request_method="GET", renderer="json")
def destinations(request):
    # request validation
    try:
        req_data = DestinationFilterRequest(**request.params.mixed())
    except ValidationError as err:
        return Response(json_body={"error": str(err.errors())}, status=400)

    # get destination from db
    with Session() as session:
        stmt = select(
            Destination
        )  # building the query step by step if the url have some parameters
        if req_data.country is not None:
            stmt = stmt.where(Destination.country == req_data.country)
        if req_data.name is not None:
            stmt = stmt.where(Destination.name == req_data.name)

        try:
            result = (
                session.execute(stmt).scalars().all()
            )  # agar kembalikan semua, atau tidak sama sekali (imo gitu sih, cmiiw)
            return [
                serialization_data(dest) for dest in result
            ]  # serialisasikan semua destinasi yang ada dari .all()
        except Exception as e:
            print(e)
            return Response(json_body={"error": "Internal Server Error"}, status=500)


@view_config(route_name="destination_detail", request_method="GET", renderer="json")
def destination_detail(request):
    dest_id = request.matchdict.get("id")
    with Session() as session:
        stmt = select(Destination).where(Destination.id == dest_id)
        try:
            result = session.execute(stmt).scalars().one()  # tampilkan 1 data
            return serialization_data(result)  # serialisasikan
        except NoResultFound:
            return Response(json_body={"error": "Destination not found"}, status=404)
        except Exception as e:
            return Response(json_body={"error": "Invalid ID or server error"}, status=400)

@view_config(route_name="destinations", request_method="POST", renderer="json")
@jwt_validate
def create_destination(request):
    try:
        try:
            payload = request.json_body
        except:
            return Response(json_body={"error": "Invalid JSON payload"}, status=400)

        name = payload.get("name")
        description = payload.get("description")
        country = payload.get("country")
        photo_url = payload.get("photo_url")

        if not name or not description or not country or not photo_url:
            return Response(
                json_body={"error": "name, description, country, photo_url are required"},
                status=400,
            )

        with Session() as session:
            new_destination = Destination(
                name=name.strip(),
                description=description.strip(),
                country=country.strip(),
                photo_url=photo_url.strip(),
            )

            try:
                session.add(new_destination)
                session.commit()
                return {
                    "message": "Destination created successfully",
                    "destination": serialization_data(new_destination),
                }
            except IntegrityError:
                session.rollback()
                return Response(
                    json_body={"error": "Destination with this name already exists"},
                    status=409,
                )

    except Exception as e:
        print(f"Error creating destination: {e}")
        return Response(json_body={"error": "Internal server error"}, status=500)


@view_config(route_name="destination_detail", request_method="PUT", renderer="json")
@jwt_validate
def update_destination(request):
    dest_id = request.matchdict.get("id")
    
    try:
        try:
            payload = request.json_body
        except:
            return Response(json_body={"error": "Invalid JSON payload"}, status=400)
        
        name = payload.get("name")
        country = payload.get("country")
        description = payload.get("description")
        photo_url = payload.get("photo_url")
        
        if not name or not country:
            return Response(json_body={"error": "Name and country are required"}, status=400)
        
        with Session() as session:
            stmt = select(Destination).where(Destination.id == dest_id)
            try:
                destination = session.execute(stmt).scalars().one()
            except NoResultFound:
                return Response(json_body={"error": "Destination not found"}, status=404)

            destination.name = name.strip()
            destination.country = country.strip()
            destination.description = (description or "").strip()
            if photo_url:
                destination.photo_url = photo_url.strip()
            
            try:
                session.commit()
                return {
                    "message": "Destination updated successfully",
                    "destination": serialization_data(destination)
                }
            except IntegrityError:
                session.rollback()
                return Response(json_body={"error": "Destination with this name already exists"}, status=409)
            except Exception as err:
                session.rollback()
                return Response(json_body={"error": str(err)}, status=500)
                
    except Exception as e:
        print(f"Error updating destination: {e}")
        return Response(json_body={"error": "Internal server error"}, status=500)


@view_config(route_name="destination_detail", request_method="DELETE", renderer="json")
@jwt_validate
def delete_destination(request):
    dest_id = request.matchdict.get("id")
    
    try:
        with Session() as session:
            stmt = select(Destination).where(Destination.id == dest_id)
            try:
                destination = session.execute(stmt).scalars().one()
            except NoResultFound:
                return Response(json_body={"error": "Destination not found"}, status=404)
            
            try:
                session.delete(destination)
                session.commit()
                return {
                    "message": "Destination deleted successfully",
                    "id": str(dest_id)
                }
            except Exception as err:
                session.rollback()
                return Response(json_body={"error": str(err)}, status=500)
                
    except Exception as e:
        print(f"Error deleting destination: {e}")
        return Response(json_body={"error": "Internal server error"}, status=500)
