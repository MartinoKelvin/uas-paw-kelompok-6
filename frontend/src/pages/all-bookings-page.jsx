import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowLeft,
  Star,
  Phone,
  Loader2,
  Upload,
  FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/layout/main-layout";
import { useAuthStore } from "@/store/auth-store";
import { ReviewForm } from "@/components/review-form";
import { useSEO } from "@/hooks/use-seo";
import * as bookingService from "@/services/booking.service";
import * as packageService from "@/services/package.service";
import * as destinationService from "@/services/destination.service";
import * as paymentService from "@/services/payment.service";
export default function AllBookingsPage() {
  const navigate = useNavigate();

  useSEO({
    title: "All Bookings",
    description:
      "View and manage all your travel bookings. Track your trip history and leave reviews for completed journeys.",
    keywords: "all bookings, booking history, travel history, trip management",
  });
  const { user, isAuthenticated } = useAuthStore();

  // API data states
  const [isLoading, setIsLoading] = useState(true);
  const [myBookings, setMyBookings] = useState([]);
  const [packages, setPackages] = useState([]);
  const [destinations, setDestinations] = useState([]);

  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Payment proof upload states
  const [uploadingPaymentProof, setUploadingPaymentProof] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "tourist") {
      navigate("/sign-in");
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [bookings, allPackages, allDestinations] = await Promise.all([
          bookingService.getBookingsByTourist(user.id),
          packageService.getAllPackages(),
          destinationService.getAllDestinations(),
        ]);
        setMyBookings(bookings);
        setPackages(allPackages);
        setDestinations(allDestinations);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        toast.error("Failed to load bookings");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, user, navigate]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle2 className="h-4 w-4" />;
      case "completed":
        return <CheckCircle2 className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "completed":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
      case "cancelled":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
    }
  };

  const handleWriteReview = (bookingId, packageId, packageName) => {
    setSelectedBooking({ bookingId, packageId, packageName });
    setReviewDialogOpen(true);
  };

  const handlePaymentProofUpload = async (bookingId, file) => {
    setUploadingPaymentProof(bookingId);
    try {
      await paymentService.uploadPaymentProof(bookingId, file);
      toast.success("Payment proof uploaded successfully Waiting for verification.");

      // Refresh bookings to get updated status
      const updatedBookings = await bookingService.getBookingsByTourist(user.id);
      setMyBookings(updatedBookings);
    } catch (error) {
      console.error("Failed to upload payment proof:", error);
      const err = error;
      toast.error(err.response?.data?.error || "Failed to upload payment proof");
    } finally {
      setUploadingPaymentProof(null);
    }
  };

  const handleFileSelect = (bookingId) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png,image/gif";
    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
          toast.error("File size must be less than 5MB");
          return;
        }
        // Validate file type
        if (["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
          toast.error("Only JPEG, PNG, and GIF images are allowed");
          return;
        }
        handlePaymentProofUpload(bookingId, file);
      }
    };
    input.click();
  };

  const stats = {
    total: myBookings.length,
    confirmed: myBookings.filter((b) => b.status === "confirmed").length,
    completed: myBookings.filter((b) => b.status === "completed").length,
    pending: myBookings.filter((b) => b.status === "pending").length,
    cancelled: myBookings.filter((b) => b.status === "cancelled").length,
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
        <div className="flex items-center justify-between">
          <div>
            <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-4 -ml-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            <h1 className="text-foreground text-2xl font-bold md:text-4xl">All My Bookings</h1>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              View and manage all your travel bookings
            </p>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid gap-4 md:grid-cols-5">
          <Card className="border-border">
            <CardContent className="p-6">
              <div className="text-muted-foreground mb-2 text-xs font-medium uppercase">
                Total Bookings
              </div>
              <div className="text-foreground text-3xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-6">
              <div className="text-muted-foreground mb-2 flex items-center gap-2 text-xs font-medium uppercase">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Confirmed
              </div>
              <div className="text-foreground text-3xl font-bold">{stats.confirmed}</div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-6">
              <div className="text-muted-foreground mb-2 flex items-center gap-2 text-xs font-medium uppercase">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                Completed
              </div>
              <div className="text-foreground text-3xl font-bold">{stats.completed}</div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-6">
              <div className="text-muted-foreground mb-2 flex items-center gap-2 text-xs font-medium uppercase">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                Pending
              </div>
              <div className="text-foreground text-3xl font-bold">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-6">
              <div className="text-muted-foreground mb-2 flex items-center gap-2 text-xs font-medium uppercase">
                <XCircle className="text-destructive h-4 w-4" />
                Cancelled
              </div>
              <div className="text-foreground text-3xl font-bold">{stats.cancelled}</div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings List */}
        <Card className="border-border">
          <CardContent className="p-6">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>

              {["all", "confirmed", "completed", "pending", "cancelled"].map((status) => (
                <TabsContent key={status} value={status} className="space-y-4">
                  {myBookings
                    .filter((b) => status === "all" || b.status === status)
                    .map((booking) => {
                      const pkg = packages.find((p) => p.id === booking.packageId);
                      const destination = pkg
                        ? destinations.find((d) => d.id === pkg.destinationId)
                        : undefined;

                      if (!pkg || !destination) return null;

                      return (
                        <Card key={booking.id} className="border-border">
                          <CardContent className="p-6">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                              {/* Left Side - Package Info */}
                              <div className="flex-1 space-y-4">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h3 className="text-foreground text-xl font-bold">
                                      {pkg.name}
                                    </h3>
                                    <div className="text-muted-foreground mt-1 flex items-center gap-2">
                                      <MapPin className="h-4 w-4" />
                                      <span>
                                        {destination.name}, {destination.country}
                                      </span>
                                    </div>
                                    {pkg.contactPhone && (
                                      <div className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
                                        <Phone className="h-3 w-3" />
                                        <span>{pkg.contactPhone}</span>
                                      </div>
                                    )}
                                  </div>
                                  <Badge
                                    className={`${getStatusColor(booking.status)} flex items-center gap-1`}
                                  >
                                    {getStatusIcon(booking.status)}
                                    {booking.status}
                                  </Badge>
                                </div>

                                <Separator />

                                <div className="grid gap-4 md:grid-cols-3">
                                  <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                                      <Calendar className="text-primary h-5 w-5" />
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground text-xs">Travel Date</p>
                                      <p className="text-foreground font-semibold">
                                        {format(new Date(booking.travelDate), "PPP")}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                                      <Users className="text-primary h-5 w-5" />
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground text-xs">Travelers</p>
                                      <p className="text-foreground font-semibold">
                                        {booking.travelersCount}{" "}
                                        {booking.travelersCount === 1 ? "Person" : "People"}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                                      <Clock className="text-primary h-5 w-5" />
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground text-xs">Duration</p>
                                      <p className="text-foreground font-semibold">
                                        {pkg.duration} {pkg.duration === 1 ? "Day" : "Days"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Right Side - Price & Actions */}
                              <div className="flex flex-col items-end gap-4">
                                <div className="text-right">
                                  <p className="text-muted-foreground text-xs">Total Price</p>
                                  <p className="text-foreground text-3xl font-bold">
                                    ${booking.totalPrice.toLocaleString()}
                                  </p>
                                </div>

                                <div className="flex w-full flex-col gap-2 lg:w-auto">
                                  <Button
                                    onClick={() => navigate(`/packages/${pkg.id}`)}
                                    className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
                                  >
                                    View Package Details
                                  </Button>

                                  {/* Upload Payment Proof Button */}
                                  {booking.status === "pending" &&
                                    booking.paymentStatus &&
                                    ["unpaid", "rejected"].includes(booking.paymentStatus) && (
                                      <Button
                                        onClick={() => handleFileSelect(booking.id)}
                                        variant="outline"
                                        className="flex w-full items-center gap-2"
                                        disabled={uploadingPaymentProof === booking.id}
                                      >
                                        {uploadingPaymentProof === booking.id ? (
                                          <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Uploading...
                                          </>
                                        ) : (
                                          <>
                                            <Upload className="h-4 w-4" />
                                            Upload Payment Proof
                                          </>
                                        )}
                                      </Button>
                                    )}

                                  {/* Payment Status Indicators */}
                                  {booking.paymentStatus === "pending_verification" && (
                                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                                      <Clock className="h-4 w-4 text-yellow-600" />
                                      Payment verification pending
                                    </div>
                                  )}

                                  {booking.paymentStatus === "verified" && (
                                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                                      <FileCheck className="h-4 w-4 text-green-600" />
                                      Payment verified
                                    </div>
                                  )}

                                  {booking.paymentStatus === "rejected" &&
                                    booking.paymentRejectionReason && (
                                      <div className="bg-destructive/10 rounded-lg p-2 text-sm">
                                        <div className="text-destructive flex items-center gap-2 font-semibold">
                                          <XCircle className="h-4 w-4" />
                                          Payment rejected
                                        </div>
                                        <p className="text-muted-foreground mt-1 text-xs">
                                          {booking.paymentRejectionReason}
                                        </p>
                                      </div>
                                    )}

                                  {booking.status === "completed" && !booking.hasReviewed && (
                                    <Button
                                      onClick={() =>
                                        handleWriteReview(booking.id, pkg.id, pkg.name)
                                      }
                                      variant="outline"
                                      className="flex w-full items-center gap-2"
                                    >
                                      <Star className="h-4 w-4" />
                                      Write Review
                                    </Button>
                                  )}

                                  {booking.status === "completed" && booking.hasReviewed && (
                                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                                      Review submitted
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}

                  {myBookings.filter((b) => status === "all" || b.status === status).length ===
                    0 && (
                    <Card className="border-border p-12 text-center">
                      <p className="text-muted-foreground mb-4">
                        No {status !== "all" && status} bookings found
                      </p>
                      <Button
                        onClick={() => navigate("/packages")}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Browse Packages
                      </Button>
                    </Card>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </section>

      {/* Review Dialog */}
      {selectedBooking && (
        <ReviewForm
          bookingId={selectedBooking.bookingId}
          packageId={selectedBooking.packageId}
          packageName={selectedBooking.packageName}
          open={reviewDialogOpen}
          onOpenChange={(open) => {
            setReviewDialogOpen(open);
            if (!open) {
              setSelectedBooking(null);
            }
          }}
        />
      )}
    </MainLayout>
  );
}
