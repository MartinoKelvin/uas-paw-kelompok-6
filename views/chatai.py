import httpx
from pyramid.response import Response
from pyramid.view import view_config

@view_config(route_name='chatai', request_method='POST')
def chatai(request):
    # get the request parameter
    try:
        req_data = request.json_body
    except:
        return Response("Body harus berupa JSON valid", status=400)
    user_promt = req_data.get('prompt')

    print(user_promt)

    payload = {
        "model": "qwen3:0.6b",
        "messages": [
            {
                "role": "user",
                "content": user_promt
            }
        ],
        "stream": True
    }

    def generate_response():
        with httpx.Client() as client:
            with client.stream('POST', 'http://localhost:11434/api/chat', json=payload) as r:
                for chunk in r.iter_bytes():
                    if chunk:
                        yield chunk

    return Response(app_iter=generate_response(), content_type='application/x-ndjson')
