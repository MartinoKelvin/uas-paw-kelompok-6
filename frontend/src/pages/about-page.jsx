import MainLayout from "@/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { MapPin, Users, Award, Heart } from "lucide-react";
import { useSEO } from "@/hooks/use-seo";

const values = [
  {
    icon: Heart,
    title: "Passion for Travel",
    description: "We believe travel transforms lives and creates unforgettable memories.",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Your satisfaction and comfort are our top priorities in everything we do.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in every package and service we offer.",
  },
  {
    icon: MapPin,
    title: "Authentic Experiences",
    description: "We curate genuine local experiences that connect you with destinations.",
  },
];

const team = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Michael Chen",
    role: "Head of Operations",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Emily Rodriguez",
    role: "Travel Experience Director",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
  },
];

export default function AboutPage() {
  const navigate = useNavigate();

  useSEO({
    title: "About Us",
    description:
      "Learn about Wonderfull Inn, your trusted travel partner. We are passionate about creating unforgettable travel experiences and authentic adventures.",
    keywords:
      "about Wonderfull Inn, travel company, travel agency, tourism company, vacation planning",
  });

  return (
    <MainLayout>
      <section className="space-y-12 py-2 md:py-8">
        {/* Hero Section */}
        <div className="space-y-6">
          <div className="space-y-4 text-center">
            <h1 className="text-foreground text-2xl leading-tight font-bold md:text-4xl lg:text-5xl">
              About Wonderfull Inn
            </h1>
            <p className="text-muted-foreground mx-auto max-w-3xl text-sm leading-relaxed md:text-lg">
              Your trusted partner in creating unforgettable travel experiences around the world.
            </p>
          </div>

          <div className="border-border overflow-hidden rounded-lg border">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop"
              alt="About Wonderfull Inn"
              className="aspect-21/9 w-full object-cover"
            />
          </div>
        </div>

        {/* Story Section */}
        <div className="border-border rounded-lg border p-6 md:p-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <h2 className="text-foreground text-2xl font-bold md:text-3xl">Our Story</h2>
              <div className="text-muted-foreground space-y-4 text-sm leading-relaxed md:text-base">
                <p>
                  Founded in 2020, Wonderfull Inn was born from a simple idea: travel should be
                  accessible, memorable, and transformative for everyone.
                </p>
                <p>
                  What started, connecting thousands of travelers with their dream destinations
                  every year.
                </p>
                <p>
                  We work with local travel agents and experts worldwide to curate authentic
                  experiences that go beyond typical tourist attractions, helping you discover the
                  heart and soul of each destination.
                </p>
              </div>
            </div>

            <div className="border-border overflow-hidden rounded-lg border">
              <img
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000&auto=format&fit=crop"
                alt="Our team"
                className="aspect-4/3 w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-foreground text-2xl font-bold md:text-3xl">Our Values</h2>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-6">
                  <div className="bg-primary/10 mb-4 inline-flex rounded-lg p-3">
                    <value.icon className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="text-foreground mb-2 text-lg font-bold">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-foreground text-2xl font-bold md:text-3xl">Meet Our Team</h2>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              The people behind your perfect vacation
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {team.map((member, index) => (
              <Card key={index} className="border-border overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="aspect-square w-full object-cover"
                />
                <CardContent className="p-6 text-center">
                  <h3 className="text-foreground text-lg font-bold">{member.name}</h3>
                  <p className="text-muted-foreground text-sm">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary/5 border-border rounded-lg border p-8 text-center md:p-12">
          <h2 className="text-foreground mb-4 text-2xl font-bold md:text-3xl">
            Ready to Start Your Journey?
          </h2>
          <p className="text-muted-foreground mx-auto mb-6 max-w-2xl text-sm md:text-base">
            Explore our curated travel packages and book your next adventure today.
          </p>
          <Button
            onClick={() => navigate("/packages")}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            size="lg"
          >
            Browse Packages
          </Button>
        </div>
      </section>
    </MainLayout>
  );
}
