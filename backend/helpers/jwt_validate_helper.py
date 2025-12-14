import jwt
from functools import wraps
from pyramid.response import Response


def jwt_validate(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        # get header
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return Response(json_body={"error": "Missing Token"}, status=401)
        try:
            token_type, token = auth_header.split(" ", 1)
            if token_type != "Bearer":
                raise ValueError("Invalid token type")
        except ValueError:
            return Response(
                json_body={"error": "Invalid Authorization header format"}, status=401
            )

        # validate jwt
        try:
            payload = jwt.decode(
                token, "secret", algorithms=["HS256"], require=["exp", "iat"]
            )
            request.jwt_claims = payload
        except jwt.ExpiredSignatureError:
            return Response(json_body={"error": "Token expired"}, status=401)
        except:
            return Response(json_body={"error": "Invalid token"}, status=401)

        return func(request, *args, **kwargs)

    return wrapper
