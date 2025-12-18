from pyramid.response import Response
from pyramid.view import view_config
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from db import Session
from models.tour_guide_assignment_model import TourGuideAssignment
from models.booking_model import Booking
from models.user_model import User
from helpers.jwt_validate_helper import jwt_validate
from pydantic import BaseModel, ValidationError
import uuid

#request class 
class AssignmentRequest(BaseModel):
    bookingId: str
    guideId: str

@view_config(route_name="assignment_create", request_method="POST", renderer="json")
@jwt_validate
def assignment_create(request):
    try:
        user_id = request.jwt_claims.get("sub")
        user_role = request.jwt_claims.get("role")
        
        if user_role != "agent":
            return Response(json_body={"error": "Hanya agent yang dapat menugaskan guide"}, status=403)

        try:
            data = AssignmentRequest(**request.json_body)
            booking_uuid = uuid.UUID(data.bookingId)
            guide_uuid = uuid.UUID(data.guideId)
        except (ValidationError, ValueError):
            return Response(json_body={"error": "Format ID tidak valid"}, status=400)

        with Session() as session:
            #validaate booking status 
            booking = session.execute(
                select(Booking).where(Booking.id == booking_uuid)
            ).scalar_one_or_none()

            if not booking:
                return Response(json_body={"error": "Booking tidak ditemukan"}, status=404)
            
            #must be agent's package's booking 
            if str(booking.package.agent_id) != user_id:
                return Response(json_body={"error": "Anda tidak memiliki akses ke booking ini"}, status=403)

            #get user role is must guide 
            guide = session.execute(
                select(User).where(User.id == guide_uuid, User.role == "guide")
            ).scalar_one_or_none()

            if not guide:
                return Response(json_body={"error": "User bukan merupakan guide yang valid"}, status=400)

            # asiggnement 
            new_assignment = TourGuideAssignment(
                booking_id=booking_uuid,
                guide_id=guide_uuid,
                status="assigned"
            )

            try:
                session.add(new_assignment)
                session.commit()
                
                return {
                    "message": "Guide berhasil ditugaskan",
                    "assignmentId": str(new_assignment.id),
                    "bookingId": str(booking_uuid),
                    "guideName": guide.name
                }
            except IntegrityError:
                session.rollback()
                return Response(json_body={"error": "Guide sudah ditugaskan untuk booking ini"}, status=409)
                
    except Exception as e:
        print(f"CRITICAL ERROR: {e}")
        return Response(json_body={"error": "Internal Server Error"}, status=500)
