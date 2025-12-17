import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDestinationStore } from "@/store/destination-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Package, ArrowRight } from "lucide-react";
import * as destinationService from "@/services/destination.service";
import * as packageService from "@/services/package.service";
import { toast } from "sonner";
import { getImageUrl } from "@/lib/image-utils";

export default function DestinationsPage() {
  const navigate = useNavigate();
  const { destinations, packages, setDestinations, setPackages } = useDestinationStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [destinationsData, packagesData] = await Promise.all([
          destinationService.getAllDestinations(),
          packageService.getAllPackages(),
        ]);
        setDestinations(destinationsData);
        setPackages(packagesData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        toast.error("Failed to load destinations");
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get unique countries
  const countries = useMemo(() => {
    const uniqueCountries = Array.from(new Set(destinations.map((d) => d.country)));
    return ["all", ...uniqueCountries.sort()];
  }, [destinations]);

  // Filter destinations
  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      const matchesSearch =
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCountry = selectedCountry === "all" || dest.country === selectedCountry;
      return matchesSearch && matchesCountry;
    });
  }, [destinations, searchQuery, selectedCountry]);

  // Get popular packages for a destination
  const getPopularPackages = (destinationId) => {
    return packages
      .filter((pkg) => pkg.destinationId === destinationId)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 3);
  };

  // Navigate to packages filtered by destination
  const handleViewPackages = (destinationId) => {
    navigate(`/packages?destination=${destinationId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
            Explore Destinations
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover amazing places around the world with our curated travel packages
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {countries.map((country) => (
              <Button
                key={country}
                variant={selectedCountry === country ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCountry(country)}
                className="capitalize"
              >
                {country}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredDestinations.length} destination
          {filteredDestinations.length !== 1 ? "s" : ""}
        </div>

        {/* Destinations Grid */}
        {filteredDestinations.length === 0 ? (
          <div className="py-16 text-center">
            <MapPin className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              No destinations found
            </h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Try adjusting your search or filters
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCountry("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDestinations.map((destination) => {
              const popularPackages = getPopularPackages(destination.id);
              const totalPackages = packages.filter(
                (pkg) => pkg.destinationId === destination.id
              ).length;

              return (
                <Card
                  key={destination.id}
                  className="overflow-hidden transition-shadow duration-300 hover:shadow-lg"
                >
                  {/* Destination Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={getImageUrl(destination.photoUrl)}
                      alt={destination.name}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-gray-900">
                        <MapPin className="mr-1 h-3 w-3" />
                        {destination.country}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl">{destination.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {destination.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Package Count */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Package className="h-4 w-4" />
                      <span>
                        {totalPackages} package{totalPackages !== 1 ? "s" : ""} available
                      </span>
                    </div>

                    {/* Popular Packages */}
                    {popularPackages.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Popular Packages:
                        </p>
                        <ul className="space-y-1">
                          {popularPackages.map((pkg) => (
                            <li
                              key={pkg.id}
                              className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                            >
                              <span className="text-primary mt-0.5">•</span>
                              <span className="line-clamp-1 flex-1">
                                {pkg.name} - ${pkg.price}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* View Packages Button */}
                    <Button className="w-full" onClick={() => handleViewPackages(destination.id)}>
                      View All Packages
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
