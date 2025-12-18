import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

import MainLayout from "@/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useAuthStore } from "@/store/auth-store";
import { useSEO } from "@/hooks/use-seo";
import * as destinationService from "@/services/destination.service";

export default function EditDestinationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();

  useSEO({
    title: "Edit Destination",
    description: "Update destination details and information.",
    keywords: "edit destination, destination management, agent tools",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    description: "",
    photo_url: "",
  });

  // Fetch destination
  useEffect(() => {
    if (!isAuthenticated || user?.role !== "agent") {
      navigate("/sign-in");
      return;
    }

    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchDestination = async () => {
      try {
        const data = await destinationService.getDestinationById(id);

        setFormData({
          name: data.name ?? "",
          country: data.country ?? "",
          description: data.description ?? "",
          photo_url: data.photo_url ?? "",
        });
      } catch (error) {
        console.error("Failed to fetch destination:", error);
        toast.error("Destination not found");
        navigate("/manage-destinations");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestination();
  }, [id, isAuthenticated, user, navigate]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.country) {
      toast.error("Name and country are required");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        country: formData.country.trim(),
        description: formData.description.trim(),
        photo_url: formData.photo_url.trim(),
      };

      await destinationService.updateDestination(id, payload);

      toast.success("Destination updated successfully!");
      navigate("/manage-destinations");
    } catch (error) {
      console.error("Failed to update destination:", error);
      toast.error(error.response?.data?.message || "Failed to update destination");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="space-y-6 py-2 md:space-y-8 md:py-8 lg:py-12">
        <Button variant="ghost" onClick={() => navigate("/manage-destinations")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Destinations
        </Button>

        <h1 className="text-foreground text-3xl font-bold">
          Edit Destination
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Destination Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Destination Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="e.g., Bali"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="e.g., Indonesia"
                      value={formData.country}
                      onChange={(e) => handleChange("country", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Description
                    </label>
                    <Textarea
                      placeholder="Describe this destination..."
                      rows={5}
                      value={formData.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Photo URL
                    </label>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      value={formData.photo_url}
                      onChange={(e) => handleChange("photo_url", e.target.value)}
                    />
                    {formData.photo_url && (
                      <div className="mt-3">
                        <img
                          src={formData.photo_url}
                          alt="Preview"
                          className="w-full max-w-md h-48 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="border-border sticky top-8">
                <CardHeader>
                  <CardTitle>Update</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Updating..." : "Update Destination"}
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
                    <p>• Name and country are required</p>
                    <p>• Changes will be saved immediately</p>
                    <p>• Photo URL should be a valid image link</p>
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