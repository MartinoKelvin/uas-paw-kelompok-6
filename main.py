from waitress import serve
from pyramid.config import Configurator

if __name__ == '__main__':
    with Configurator() as config:

        #Route
        config.add_route('home', '/')
        config.add_route('chatai', '/chatai')

        config.include('views')
        config.scan()
        app = config.make_wsgi_app()
    serve(app, host='0.0.0.0', port=8080)
