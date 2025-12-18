import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import MainLayout from "@/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useAuthStore } from "@/store/auth-store";
import { useSEO } from "@/hooks/use-seo";
import * as destinationService from "@/services/destination.service";

export default function CreateDestinationPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();

  useSEO({
    title: "Create Destination",
    description: "Create a new travel destination.",
  });

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    description: "",
    photo_url: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "agent") {
      navigate("/sign-in");
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, country, description, photo_url } = formData;

    if (!name || !country || !description || !photo_url) {
      toast.error("All fields are required");
      return;
    }

    setIsSubmitting(true);

    try {
      await destinationService.createDestination(formData);
      toast.success("Destination created successfully!");
      navigate("/manage-destinations");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create destination");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <section className="space-y-6 py-2 md:space-y-8 md:py-8 lg:py-12">
        {/* Header */}
        <div>
          <Button
            variant="ghost"
            onClick={() => navigate("/manage-destinations")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Destinations
          </Button>

          <h1 className="text-foreground text-3xl font-bold md:text-4xl">
            Create New Destination
          </h1>
          <p className="text-muted-foreground mt-2">
            Add a new destination that can be used in travel packages
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-3">
            {/* LEFT - FORM */}
            <div className="lg:col-span-2">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Destination Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    name="name"
                    placeholder="Destination name"
                    value={formData.name}
                    onChange={handleChange}
                  />

                  <Input
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                  />

                  <Input
                    name="photo_url"
                    placeholder="Photo URL"
                    value={formData.photo_url}
                    onChange={handleChange}
                  />

                  <Textarea
                    name="description"
                    placeholder="Description"
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                  />
                </CardContent>
              </Card>
            </div>

            {/* RIGHT - PUBLISH */}
            <div className="lg:col-span-1">
              <Card className="border-border sticky top-8">
                <CardHeader>
                  <CardTitle>Publish</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create Destination"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/manage-destinations")}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>

                  <div className="text-muted-foreground space-y-2 pt-4 text-sm">
                    <p>• All fields are required</p>
                    <p>• Use a clear destination name</p>
                    <p>• Provide a valid photo URL</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </section>
    </MainLayout>
  );
}
