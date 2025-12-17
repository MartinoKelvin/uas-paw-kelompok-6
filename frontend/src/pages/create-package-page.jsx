import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import MainLayout from "@/layout/main-layout";
import { useAuthStore } from "@/store/auth-store";
import { useDestinationStore } from "@/store/destination-store";
import { packageSchema } from "@/lib/validations";
import * as destinationService from "@/services/destination.service";
import * as packageService from "@/services/package.service";
import { PackageForm } from "@/components/package-form";
import { useFormValidation } from "@/hooks/use-form-validation";
import { useFileArray } from "@/hooks/use-file-array";
import { useSEO } from "@/hooks/use-seo";

export default function CreatePackagePage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { destinations, setDestinations, addPackage } = useDestinationStore();

  useSEO({
    title: "Create Package",
    description:
      "Create a new travel package for your agency. Add details, set pricing, and start attracting travelers.",
    keywords: "create package, new package, agent tools, package management",
  });

  const [formData, setFormData] = useState({
    name: "",
    destinationId: "",
    duration: "",
    price: "",
    itinerary: "",
    maxTravelers: "",
    contactPhone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { errors, validate } = useFormValidation(packageSchema);
  const {
    files: imageFiles,
    previews: imagePreviews,
    addFiles,
    removeFile,
    canAddMore,
  } = useFileArray(10);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "agent") {
      navigate("/sign-in");
      return;
    }

    // Fetch destinations from API
    const fetchDestinations = async () => {
      try {
        const data = await destinationService.getAllDestinations();
        setDestinations(data);
      } catch (err) {
        console.error("Failed to fetch destinations:", err);
        toast.error("Failed to load destinations");
      }
    };

    if (destinations.length === 0) {
      fetchDestinations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user, navigate, destinations.length]);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that at least 1 image is uploaded
    if (imageFiles.length === 0) {
      toast.error("Please upload at least 1 image");
      return;
    }

    const dataToValidate = {
      ...formData,
      duration: Number(formData.duration),
      price: Number(formData.price),
      maxTravelers: Number(formData.maxTravelers),
      images: imageFiles.map((f) => f.name), // For validation only
    };

    if (!validate(dataToValidate)) return;

    setIsSubmitting(true);

    try {
      const newPackage = await packageService.createPackage({
        destinationId: dataToValidate.destinationId,
        name: dataToValidate.name,
        duration: dataToValidate.duration,
        price: dataToValidate.price,
        itinerary: dataToValidate.itinerary,
        maxTravelers: dataToValidate.maxTravelers,
        contactPhone: dataToValidate.contactPhone,
        images: imageFiles, // Send actual File objects
      });

      addPackage(newPackage);
      toast.success("Package created successfully!");
      navigate("/manage-packages");
    } catch (error) {
      console.error("Failed to create package:", error);
      toast.error("Failed to create package. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <section className="space-y-6 py-2 md:space-y-8 md:py-8 lg:py-12">
        <div className="flex items-center justify-between">
          <div>
            <Button variant="ghost" onClick={() => navigate("/manage-packages")} className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Packages
            </Button>
            <h1 className="text-foreground text-3xl font-bold md:text-4xl">Create New Package</h1>
            <p className="text-muted-foreground mt-2">Add a new travel package to your catalog</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Package Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <PackageForm
                    formData={formData}
                    imageFiles={imageFiles}
                    imagePreviews={imagePreviews}
                    errors={errors}
                    destinations={destinations}
                    onFieldChange={handleFieldChange}
                    onFilesAdd={addFiles}
                    onFileRemove={removeFile}
                    canAddMoreFiles={canAddMore}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="border-border sticky top-8">
                <CardHeader>
                  <CardTitle>Publish</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Package"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/manage-packages")}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>

                  <div className="text-muted-foreground space-y-2 pt-4 text-sm">
                    <p>• All fields marked with * are required</p>
                    <p>• Use high-quality images for better engagement</p>
                    <p>• Write detailed itineraries for clarity</p>
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
