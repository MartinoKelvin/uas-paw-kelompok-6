#payment routes
def include_payments(routes):
    config.add_route("payment_generate", "/api/payment/generate")
