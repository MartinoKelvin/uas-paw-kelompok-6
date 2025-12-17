import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Edit,
  Trash2,
  MapPin,
  DollarSign,
  Users,
  Clock,
  ArrowLeft,
  Star,
  Loader2,
} from "lucide-react";
import { getImageUrl } from "@/lib/image-utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
import MainLayout from "@/layout/main-layout";
import { useSEO } from "@/hooks/use-seo";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";
import * as packageService from "@/services/package.service";
import * as destinationService from "@/services/destination.service";
import * as bookingService from "@/services/booking.service";
export default function ManagePackagesPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();

  // API data states
  const [isLoading, setIsLoading] = useState(true);
  const [packages, setPackages] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletePackageId, setDeletePackageId] = useState(null);

  useSEO({
    title: "Manage Packages",
    description:
      "Manage all your travel packages. Edit, delete, or create new packages for your travel agency.",
    keywords: "manage packages, package management, agent tools, edit packages",
  });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "agent") {
      navigate("/sign-in");
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [agentPackages, allDestinations] = await Promise.all([
          packageService.getPackagesByAgent(user.id),
          destinationService.getAllDestinations(),
        ]);
        setPackages(agentPackages);
        setDestinations(allDestinations);

        // Fetch bookings for all packages
        const allBookings = [];
        for (const pkg of agentPackages) {
          try {
            const pkgBookings = await bookingService.getBookingsByPackage(pkg.id);
            allBookings.push(...pkgBookings);
          } catch {
            // Ignore errors for individual package bookings
          }
        }
        setBookings(allBookings);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
        toast.error("Failed to load packages");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, user, navigate]);

  const filteredPackages = packages.filter((pkg) =>
    pkg.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeletePackage = async (packageId) => {
    try {
      await packageService.deletePackage(packageId);
      setPackages((prev) => prev.filter((p) => p.id !== packageId));
      toast.success("Package deleted successfully!");
    } catch (error) {
      console.error("Failed to delete package:", error);
      toast.error("Failed to delete package");
    } finally {
      setDeletePackageId(null);
    }
  };

  const getPackageBookings = (packageId) => {
    return bookings.filter((b) => b.packageId === packageId);
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader2 className="text-primary h-8 w-8 animate-spin" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="space-y-6 py-2 md:space-y-8 md:py-8">
        {/* Header */}
        <div>
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-4 -ml-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-foreground text-2xl font-bold md:text-4xl">Manage Packages</h1>
              <p className="text-muted-foreground mt-2 text-sm md:text-base">
                Create, edit, and manage your travel packages
              </p>
            </div>
            <Button
              onClick={() => navigate("/create-package")}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New Package
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-border">
            <CardContent className="p-6">
              <div className="text-muted-foreground mb-2 text-xs font-medium uppercase">
                Total Packages
              </div>
              <div className="text-foreground text-3xl font-bold">{packages.length}</div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-6">
              <div className="text-muted-foreground mb-2 text-xs font-medium uppercase">
                Total Bookings
              </div>
              <div className="text-foreground text-3xl font-bold">
                {bookings.filter((b) => packages.some((p) => p.id === b.packageId)).length}
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-6">
              <div className="text-muted-foreground mb-2 text-xs font-medium uppercase">
                Avg Rating
              </div>
              <div className="text-foreground text-3xl font-bold">
                {packages.length > 0
                  ? (
                      packages.reduce((sum, p) => sum + (p.rating || 0), 0) / packages.length
                    ).toFixed(1)
                  : "0.0"}
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-6">
              <div className="text-muted-foreground mb-2 text-xs font-medium uppercase">
                Total Revenue
              </div>
              <div className="text-foreground text-3xl font-bold">
                $
                {bookings
                  .filter(
                    (b) => b.status === "confirmed" && packages.some((p) => p.id === b.packageId)
                  )
                  .reduce((sum, b) => sum + b.totalPrice, 0)
                  .toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="border-border">
          <CardContent className="p-6">
            <Input
              placeholder="Search packages by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </CardContent>
        </Card>

        {/* Packages Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPackages.map((pkg) => {
            const destination = destinations.find((d) => d.id === pkg.destinationId);
            const pkgBookings = getPackageBookings(pkg.id);

            return (
              <Card
                key={pkg.id}
                className="border-border overflow-hidden p-2 transition-shadow hover:shadow-lg"
              >
                <div className="relative">
                  <img
                    src={getImageUrl(pkg.images[0])}
                    alt={pkg.name}
                    className="aspect-video w-full rounded-lg object-cover"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Badge className="bg-background/90 text-foreground backdrop-blur-sm">
                      ${pkg.price}
                    </Badge>
                    {pkg.rating && (
                      <Badge className="bg-background/90 text-foreground flex items-center gap-1 backdrop-blur-sm">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {pkg.rating}
                      </Badge>
                    )}
                  </div>
                </div>

                <CardContent className="p-1">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-foreground text-lg font-bold">{pkg.name}</h3>
                      <div className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4" />
                        {destination?.name}, {destination?.country}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="text-muted-foreground h-4 w-4" />
                        <span>{pkg.duration} days</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="text-muted-foreground h-4 w-4" />
                        <span>Max {pkg.maxTravelers}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="text-muted-foreground h-4 w-4" />
                        <span>${pkg.price}</span>
                      </div>
                      <div className="text-muted-foreground">{pkgBookings.length} bookings</div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => navigate(`/packages/${pkg.id}`)}
                      >
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => navigate(`/edit-package/${pkg.id}`)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                        onClick={() => setDeletePackageId(pkg.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredPackages.length === 0 && (
          <Card className="border-border p-12 text-center">
            <p className="text-muted-foreground mb-4">
              {searchQuery
                ? "No packages found matching your search"
                : "You haven't created any packages yet"}
            </p>
            <Button
              onClick={() => toast.info("Create package feature coming soon!")}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Package
            </Button>
          </Card>
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deletePackageId !== null} onOpenChange={() => setDeletePackageId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Package</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this package? This action cannot be undone. All
                related bookings will be affected.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deletePackageId && handleDeletePackage(deletePackageId)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
    </MainLayout>
  );
}
