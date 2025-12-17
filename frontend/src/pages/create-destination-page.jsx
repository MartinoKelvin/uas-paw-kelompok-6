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
import { useDestinationStore } from "@/store/destination-store";
import { useSEO } from "@/hooks/use-seo";

export default function CreateDestinationPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { createDestination } = useDestinationStore();

  useSEO({
    title: "Create Destination",
    description: "Create a new travel destination for your travel packages.",
    keywords: "create destination, travel destination, agent tools",
  });

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    description: "",
    photoUrl: "",
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "agent") {
      navigate("/sign-in");
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    if (!photoFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(photoFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [photoFile]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    setPhotoFile(file);
    if (file) {
      // clear photoUrl when a file is chosen to avoid ambiguity
      setFormData((prev) => ({ ...prev, photoUrl: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.country ||
      !formData.description ||
      (!formData.photoUrl && !photoFile)
    ) {
      toast.error(
        "Please fill in all required fields and provide either a photo URL or upload a photo"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      let newDestination;
      if (photoFile) {
        const data = new FormData();
        data.append("name", formData.name);
        data.append("country", formData.country);
        data.append("description", formData.description);
        data.append("photo", photoFile); // backend should expect field 'photo'
        newDestination = await createDestination(data);
      } else {
        const payload = {
          name: formData.name,
          country: formData.country,
          description: formData.description,
          photoUrl: formData.photoUrl,
        };
        newDestination = await createDestination(payload);
      }

      toast.success("Destination created successfully!");
      // reset form so user can create another without navigating away
      setFormData({ name: "", country: "", description: "", photoUrl: "" });
      setPhotoFile(null);
      setPreviewUrl(null);
      // remain on dashboard: navigate back to agent dashboard
      navigate("/agent/dashboard");
    } catch (error) {
      console.error("Failed to create destination:", error);
      toast.error("Failed to create destination. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <section className="space-y-6 py-2 md:space-y-8 md:py-8 lg:py-12">
        {/* Header */}
        <div>
          <Button variant="ghost" onClick={() => navigate("/destinations")} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Destinations
          </Button>

          <h1 className="text-foreground text-3xl font-bold md:text-4xl">Create New Destination</h1>
          <p className="text-muted-foreground mt-2">
            Add a new destination that can be used in travel packages
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Form */}
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
                    required
                  />

                  <Input
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    name="photoUrl"
                    type="text"
                    placeholder="Photo URL (leave empty if uploading)"
                    value={formData.photoUrl}
                    onChange={handleChange}
                  />

                  <div className="mt-2">
                    <label className="text-muted-foreground mb-1 block text-sm">
                      Or upload photo
                    </label>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    {previewUrl && (
                      <img
                        src={previewUrl}
                        alt="preview"
                        className="mt-2 max-h-40 w-auto rounded"
                      />
                    )}
                  </div>

                  <Textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    required
                  />
                </CardContent>
              </Card>
            </div>

            {/* Publish */}
            <div className="lg:col-span-1">
              <Card className="border-border sticky top-8">
                <CardHeader>
                  <CardTitle>Publish</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Destination"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/destinations")}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>

                  <div className="text-muted-foreground space-y-2 pt-4 text-sm">
                    <p>• All fields are required</p>
                    <p>• Use a clear destination name</p>
                    <p>• Provide a photo URL or upload an image</p>
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
