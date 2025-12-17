import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const defaultPromos = [
  {
    id: "1",
    title: "Unforgettable Stays, Unbeatable Offers",
    description:
      "Discover exclusive deals designed to make your vacation extra special. Save on luxurious getaways and create memories that last.",
    imageUrl:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2000&auto=format&fit=crop",
    buttonText: "Learn More",
    backgroundColor: "bg-accent",
  },
  {
    id: "2",
    title: "Tropical Paradise Awaits",
    description:
      "Escape to pristine beaches and crystal-clear waters. Experience the ultimate island getaway.",
    imageUrl:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2000&auto=format&fit=crop",
    buttonText: "Explore Now",
  },
  {
    id: "3",
    title: "Luxury Meets Nature",
    description:
      "Immerse yourself in breathtaking views and world-class amenities. Your dream vacation starts here.",
    imageUrl:
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?q=80&w=2000&auto=format&fit=crop",
    buttonText: "Book Now",
  },
];

export const PromoSection = ({ promos = defaultPromos }) => {
  const navigate = useNavigate();

  return (
    <section className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Large Featured Card */}
        <Card className="bg-accent/10 border-border md:col-span-1">
          <CardContent className="flex h-full flex-col justify-between p-6 md:p-8">
            <div className="space-y-4">
              <h3 className="text-foreground text-2xl leading-tight font-bold">
                {promos[0].title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {promos[0].description}
              </p>
            </div>
            <Button
              onClick={() => navigate("/packages")}
              className="bg-background text-foreground hover:bg-background/90 mt-6 w-fit"
            >
              {promos[0].buttonText}
            </Button>
          </CardContent>
        </Card>

        {/* Image Cards */}
        <div className="border-border overflow-hidden rounded-lg border">
          <AspectRatio ratio={4 / 3}>
            <img
              src={promos[1].imageUrl}
              alt={promos[1].title}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          </AspectRatio>
        </div>

        <div className="border-border overflow-hidden rounded-lg border">
          <AspectRatio ratio={4 / 3}>
            <img
              src={promos[2].imageUrl}
              alt={promos[2].title}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          </AspectRatio>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
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
    </section>
  );
};
