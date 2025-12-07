from waitress import serve
from pyramid.config import Configurator
import hupper


def main():
    with Configurator() as config:
        # Route
        config.add_route("home", "/api")
        config.add_route("chatai", "/api/chatai")
        config.add_route("register", "/api/auth/register")

        # config.include("views")
        config.scan("views")
        app = config.make_wsgi_app()

    print("Server running on http://0.0.0.0:6543 (Hot Reload Active)")
    serve(app, host="0.0.0.0", port=6543)


if __name__ == "__main__":
    hupper.start_reloader("main.main")

    main()
