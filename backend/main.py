import hupper
from waitress import serve
from pyramid.config import Configurator


def main():
    with Configurator() as config:
        # route
        ## auth
        config.add_route("register", "/api/auth/register")
        config.add_route("login", "/api/auth/login")
        config.add_route("me", "/api/auth/me")

        ## packages
        config.add_route("packages", "/api/packages")
        config.add_route("package_search", "/api/packages/search")
        config.add_route("package_detail", "/api/packages/{id}")
        config.add_route("package_agent", "/api/packages/agent/{agentId}")

        ## destinations
        config.add_route("destinations", "/api/destinations")
        config.add_route("destination_detail", "/api/destinations/{id}")

        config.scan("views")
        app = config.make_wsgi_app()

    print("Server running on http://0.0.0.0:6543 (Hot Reload Active)")
    serve(app, host="0.0.0.0", port=6543)


if __name__ == "__main__":
    hupper.start_reloader("main.main")
    main()
