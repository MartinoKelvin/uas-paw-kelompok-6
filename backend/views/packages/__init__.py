def serialization_data(pkg):
    return {
        "id": str(pkg.id),
        "agentId": str(pkg.agent_id),
        "destinationId": str(pkg.destination_id),
        "name": pkg.name,
        "duration": pkg.duration,
        "price": float(pkg.price),
        "itinerary": pkg.itinerary,
        "maxTravelers": pkg.max_travelers,
        "contactPhone": pkg.contact_phone,
        "images": pkg.images,
        "rating": 0,
        "reviewsCount": 0,
        "destinationName": pkg.destination.name if pkg.destination else None,
        "country": pkg.destination.country if pkg.destination else None,
    }
