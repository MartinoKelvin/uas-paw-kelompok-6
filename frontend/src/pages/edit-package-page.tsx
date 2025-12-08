import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import MainLayout from "@/layout/main-layout";
import { useAuthStore } from "@/store/auth-store";
import { useDestinationStore } from "@/store/destination-store";
import { packageSchema } from "@/lib/validations";
import { mockDestinations, mockPackages } from "@/data/mock-data";
import { PackageForm } from "@/components/package-form";
import { useFormValidation } from "@/hooks/use-form-validation";
import { useImageArray } from "@/hooks/use-image-array";
import { useSEO } from "@/hooks/use-seo";

export default function EditPackagePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { destinations, packages, setDestinations, setPackages, updatePackage } =
    useDestinationStore();

  useSEO({
    title: "Edit Package",
    description: "Update your travel package details, pricing, and availability.",
    keywords: "edit package, update package, package management, agent tools",
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
  const { images, resetImages, addImage, removeImage, updateImage } = useImageArray();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "agent") {
      navigate("/sign-in");
      return;
    }
    setDestinations(mockDestinations);
    setPackages(mockPackages);
  }, [isAuthenticated, user, navigate, setDestinations, setPackages]);

  // Check permissions
  useEffect(() => {
    const pkg = packages.find((p) => p.id === id);
    if (pkg && pkg.agentId !== user?.id) {
      toast.error("You don't have permission to edit this package");
      navigate("/manage-packages");
    }
  }, [packages, id, user?.id, navigate]);

  // Load package data - runs once when package is found
  useEffect(() => {
    const pkg = packages.find((p) => p.id === id);
    if (pkg && pkg.agentId === user?.id) {
      // Using a microtask to defer setState until after render
      Promise.resolve().then(() => {
        setFormData({
          name: pkg.name,
          destinationId: pkg.destinationId,
          duration: pkg.duration.toString(),
          price: pkg.price.toString(),
          itinerary: pkg.itinerary,
          maxTravelers: pkg.maxTravelers.toString(),
          contactPhone: pkg.contactPhone || "",
        });
        resetImages(pkg.images.length > 0 ? pkg.images : [""]);
      });
    }
  }, [packages, id, user?.id, resetImages]);

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToValidate = {
      ...formData,
      duration: Number(formData.duration),
      price: Number(formData.price),
      maxTravelers: Number(formData.maxTravelers),
      images: images.filter((img) => img.trim() !== ""),
    };

    if (!validate(dataToValidate)) return;

    setIsSubmitting(true);

    setTimeout(() => {
      updatePackage(id!, {
        name: dataToValidate.name,
        destinationId: dataToValidate.destinationId,
        duration: dataToValidate.duration,
        price: dataToValidate.price,
        itinerary: dataToValidate.itinerary,
        maxTravelers: dataToValidate.maxTravelers,
        contactPhone: dataToValidate.contactPhone,
        images: dataToValidate.images,
      });

      setIsSubmitting(false);
      toast.success("Package updated successfully!");
      navigate("/manage-packages");
    }, 1000);
  };

  const pkg = packages.find((p) => p.id === id);

  if (!pkg) {
    return (
      <MainLayout>
        <div className="flex min-h-[50vh] items-center justify-center">
          <Card className="border-border p-8 text-center">
            <p className="text-muted-foreground">Package not found</p>
            <Button onClick={() => navigate("/manage-packages")} className="mt-4" variant="outline">
              Back to Packages
            </Button>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="space-y-6 py-2 md:space-y-8 md:py-8 lg:py-12">
        <div className="flex items-center justify-between">
          <div>
            <Button variant="ghost" onClick={() => navigate("/manage-packages")} className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Packages
            </Button>
            <h1 className="text-foreground text-3xl font-bold md:text-4xl">Edit Package</h1>
            <p className="text-muted-foreground mt-2">Update your travel package information</p>
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
                    images={images}
                    errors={errors}
                    destinations={destinations}
                    onFieldChange={handleFieldChange}
                    onImageAdd={addImage}
                    onImageRemove={removeImage}
                    onImageChange={updateImage}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="border-border sticky top-8">
                <CardHeader>
                  <CardTitle>Update</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Updating..." : "Update Package"}
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
                    <p>• Changes will be saved immediately</p>
                    <p>• Existing bookings won't be affected</p>
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
