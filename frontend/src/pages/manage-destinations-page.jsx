import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Edit,
  Trash2,
  MapPin,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import MainLayout from "@/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { API_BASE_URL } from "@/services/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useSEO } from "@/hooks/use-seo";
import { useAuthStore } from "@/store/auth-store";
import * as destinationService from "@/services/destination.service";

export default function ManageDestinationsPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();

  const [isLoading, setIsLoading] = useState(true);
  const [destinations, setDestinations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useSEO({
    title: "Manage Destinations",
    description: "Manage all destinations. Create, edit, or delete destinations.",
    keywords: "manage destinations, destination management, agent tools",
  });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "agent") {
      navigate("/sign-in");
      return;
    }

    const fetchDestinations = async () => {
      setIsLoading(true);
      try {
        const data = await destinationService.getAllDestinations();
        setDestinations(data);
      } catch (error) {
        console.error("Failed to fetch destinations:", error);
        toast.error("Failed to load destinations");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestinations();
  }, [isAuthenticated, user, navigate]);

  const filteredDestinations = destinations.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      await destinationService.deleteDestination(id);
      setDestinations((prev) => prev.filter((d) => d.id !== id));
      toast.success("Destination deleted successfully!");
    } catch (error) {
      console.error("Failed to delete destination:", error);
      const errorMessage = error.response?.data?.message || "Failed to delete destination";
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

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
      <section className="space-y-6 py-2 md:space-y-8 md:py-8">
        {/* Header */}
        <div>
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-4 -ml-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-foreground text-2xl font-bold md:text-4xl">
                Manage Destinations
              </h1>
              <p className="text-muted-foreground mt-2 text-sm md:text-base">
                Create, edit, and manage travel destinations
              </p>
            </div>

            <Button onClick={() => navigate("/create-destination")}>
              <Plus className="mr-2 h-4 w-4" />
              Create Destination
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border">
            <CardContent className="p-6">
              <div className="text-muted-foreground mb-2 text-xs font-medium uppercase">
                Total Destinations
              </div>
              <div className="text-foreground text-3xl font-bold">
                {destinations.length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6">
              <div className="text-muted-foreground mb-2 text-xs font-medium uppercase">
                Countries
              </div>
              <div className="text-foreground text-3xl font-bold">
                {new Set(destinations.map((d) => d.country)).size}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6">
              <div className="text-muted-foreground mb-2 text-xs font-medium uppercase">
                With Packages
              </div>
              <div className="text-foreground text-3xl font-bold">
                {destinations.filter((d) => d.packageCount > 0).length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="border-border">
          <CardContent className="p-6">
            <Input
              placeholder="Search destinations by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </CardContent>
        </Card>

        {/* Destinations Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDestinations.map((dest) => (
            <Card
              key={dest.id}
              className="border-border transition-shadow hover:shadow-lg"
            >
              <CardContent className="p-4 space-y-4">
                {/* Image preview if photo_url exists */}
                <div className="relative h-48 w-full overflow-hidden rounded-lg border">
                  <img
                    src={
                      dest.photo_url ||
                      dest.photoUrl ||
                      `${API_BASE_URL}/destinations/placeholder.jpg`
                    }
                    alt={dest.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200"><rect fill="%23f3f4f6" width="400" height="200"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="16">Image not available</text></svg>';
                    }}
                  />
                </div>

                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{dest.name}</h3>
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4" />
                      {dest.country}
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground line-clamp-3 text-sm">
                  {dest.description || "No description"}
                </p>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => navigate(`/edit-destination/${dest.id}`)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                    onClick={() => setDeleteId(dest.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <Card className="border-border p-12 text-center">
            <p className="text-muted-foreground mb-4">
              {searchQuery
                ? "No destinations found"
                : "No destinations created yet"}
            </p>
            <Button onClick={() => navigate("/create-destination")}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Destination
            </Button>
          </Card>
        )}

        {/* Delete Dialog */}
        <AlertDialog
          open={deleteId !== null}
          onOpenChange={() => !isDeleting && setDeleteId(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Destination</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this destination? This action
                cannot be undone. All packages associated with this destination
                may be affected.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteId && handleDelete(deleteId)}
                disabled={isDeleting}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
    </MainLayout>
  );
}
