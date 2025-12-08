"use client";

import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { Package, Destination } from "@/types";

interface PackageCardProps {
  package: Package;
  destination?: Destination;
}

const PackageCard = ({ package: pkg, destination }: PackageCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="border-border overflow-hidden p-2 transition-shadow hover:shadow-lg">
      <div className="relative">
        <AspectRatio ratio={4 / 3}>
          <img
            src={pkg.images[0]}
            alt={pkg.name}
            className="h-full w-full rounded-lg object-cover"
          />
        </AspectRatio>
        <div className="bg-background/90 absolute right-4 bottom-4 rounded-full px-4 py-2">
          <span className="text-foreground text-sm font-bold">${pkg.price}</span>
        </div>
      </div>

      <CardContent className="p-1">
        <div className="space-y-4">
          <div>
            <h3 className="text-foreground text-lg font-bold">{pkg.name}</h3>
            {destination && (
              <p className="text-muted-foreground text-sm">
                {destination.name}, {destination.country}
              </p>
            )}
            {pkg.contactPhone && (
              <div className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
                <Phone className="h-3 w-3" />
                <span>{pkg.contactPhone}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {pkg.duration} {pkg.duration === 1 ? "Day" : "Days"}
            </span>
            {pkg.rating && (
              <div className="flex items-center gap-1">
                <span className="text-foreground font-semibold">{pkg.rating}</span>
                <span className="text-muted-foreground">({pkg.reviewsCount} reviews)</span>
              </div>
            )}
          </div>

          <Button
            onClick={() => navigate(`/packages/${pkg.id}`)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface FeaturedPackagesProps {
  packages: Package[];
  destinations: Destination[];
  title?: string;
}

export const FeaturedPackages = ({
  packages,
  destinations,
  title = "Lagoon View Villa",
}: FeaturedPackagesProps) => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-foreground text-2xl font-bold md:text-3xl">{title}</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl text-sm md:text-base">
            Each Lagoon View Villa is designed with your comfort in mind. Every attention to our
            pristine resort right from your cozy balcony. Exch villa is designed with natural wood
            accents. The villa greets you the serene sea with direct access to the resort.
          </p>
        </div>
      </div>

      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-1 p-1">
            {packages.map((pkg) => {
              const destination = destinations.find((d) => d.id === pkg.destinationId);
              return (
                <CarouselItem key={pkg.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <PackageCard package={pkg} destination={destination} />
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-muted-foreground text-sm">
              1 / {Math.ceil(packages.length / 3)}
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="border-border rounded-full">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="default"
                size="icon"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Carousel>
      </div>

      {/* Package Thumbnails */}
      <div className="flex gap-4">
        {packages.slice(0, 3).map((pkg, index) => (
          <div key={pkg.id} className="border-border flex-1 overflow-hidden rounded-lg border">
            <AspectRatio ratio={16 / 9}>
              <img
                src={pkg.images[Math.min(1, pkg.images.length - 1)]}
                alt={`${pkg.name} view ${index + 1}`}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </AspectRatio>
          </div>
        ))}
      </div>
    </section>
  );
};
