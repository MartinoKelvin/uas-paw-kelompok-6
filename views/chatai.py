import httpx
from pyramid.response import Response
from pyramid.view import view_config

@view_config(route_name='chatai', request_method='POST')
def chatai(request):
    payload = {
        "model": "qwen3:0.6b",
        "messages": [
            {
                "role": "user",
                "content": "what are you"
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
