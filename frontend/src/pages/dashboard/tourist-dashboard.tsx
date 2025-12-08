"use client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  Calendar,
  MapPin,
  Package as PackageIcon,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/layout/main-layout";
import { useAuthStore } from "@/store/auth-store";
import { useBookingStore } from "@/store/booking-store";
import { useDestinationStore } from "@/store/destination-store";
import { mockDestinations, mockPackages } from "@/data/mock-data";
import { useSEO } from "@/hooks/use-seo";

export default function TouristDashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();

  useSEO({
    title: "My Dashboard",
    description:
      "Manage your travel bookings, view upcoming trips, and track your travel history with Wanderlust Inn.",
    keywords: "tourist dashboard, my bookings, travel management, trip history",
  });
  const { getBookingsByTourist, updateBookingStatus } = useBookingStore();
  const { destinations, packages, setDestinations, setPackages } = useDestinationStore();

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      updateBookingStatus(bookingId, "cancelled");
      toast.success("Booking cancelled successfully");
    }
  };

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "tourist") {
      navigate("/sign-in");
      return;
    }
    setDestinations(mockDestinations);
    setPackages(mockPackages);
  }, [isAuthenticated, user, navigate, setDestinations, setPackages]);

  const myBookings = user ? getBookingsByTourist(user.id) : [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle2 className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "cancelled":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
    }
  };

  const stats = {
    total: myBookings.length,
    confirmed: myBookings.filter((b) => b.status === "confirmed").length,
    pending: myBookings.filter((b) => b.status === "pending").length,
    cancelled: myBookings.filter((b) => b.status === "cancelled").length,
  };

  return (
    <MainLayout>
      <section className="space-y-2 py-2 md:space-y-8 md:py-8 lg:py-12">
        {/* Header */}
        <div>
          <h1 className="text-foreground text-3xl font-bold md:text-4xl">My Dashboard</h1>
          <p className="text-muted-foreground mt-2 text-base md:text-lg">
            Welcome back, {user?.name}!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                Total Bookings
              </CardTitle>
              <PackageIcon className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-foreground text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-muted-foreground text-sm font-medium">Confirmed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-foreground text-2xl font-bold">{stats.confirmed}</div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-muted-foreground text-sm font-medium">Pending</CardTitle>
              <AlertCircle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-foreground text-2xl font-bold">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-muted-foreground text-sm font-medium">Cancelled</CardTitle>
              <XCircle className="text-destructive h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-foreground text-2xl font-bold">{stats.cancelled}</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2 md:gap-4">
            <Button
              onClick={() => navigate("/packages")}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Browse Packages
            </Button>
            <Button
              variant="outline"
              className="border-border"
              onClick={() => navigate("/all-bookings")}
            >
              View All Bookings
            </Button>
          </CardContent>
        </Card>

        {/* Bookings */}
        <Card className="border-border gap-1 p-2 md:gap-4 md:p-4">
          <CardHeader className="p-1">
            <CardTitle className="text-foreground">My Bookings</CardTitle>
          </CardHeader>
          <CardContent className="p-0 md:p-4">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmed ({stats.confirmed})</TabsTrigger>
                <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled ({stats.cancelled})</TabsTrigger>
              </TabsList>

              {["all", "confirmed", "pending", "cancelled"].map((status) => (
                <TabsContent key={status} value={status} className="space-y-2 md:space-y-4">
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
                          <CardContent className="p-4 md:p-6">
                            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-4">
                              <div className="flex-1 space-y-2 md:space-y-3">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h3 className="text-foreground text-lg font-semibold">
                                      {pkg.name}
                                    </h3>
                                    <div className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
                                      <MapPin className="h-4 w-4" />
                                      <span>
                                        {destination.name}, {destination.country}
                                      </span>
                                    </div>
                                    {pkg.contactPhone && (
                                      <div className="text-muted-foreground mt-1 flex items-center gap-2 text-xs">
                                        <Phone className="h-3 w-3" />
                                        <span>{pkg.contactPhone}</span>
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex flex-col items-end gap-2">
                                    <Badge
                                      className={`${getStatusColor(booking.status)} flex items-center gap-1`}
                                    >
                                      {getStatusIcon(booking.status)}
                                      {booking.status}
                                    </Badge>
                                    {/* Payment Status Badge */}
                                    {booking.paymentStatus && (
                                      <Badge
                                        variant={
                                          booking.paymentStatus === "verified"
                                            ? "default"
                                            : booking.paymentStatus === "pending_verification"
                                              ? "secondary"
                                              : booking.paymentStatus === "rejected"
                                                ? "destructive"
                                                : "outline"
                                        }
                                        className="text-xs"
                                      >
                                        {booking.paymentStatus === "verified" && "✓ Paid"}
                                        {booking.paymentStatus === "pending_verification" &&
                                          "⏳ Verifying"}
                                        {booking.paymentStatus === "rejected" && "✗ Rejected"}
                                        {booking.paymentStatus === "unpaid" && "Unpaid"}
                                      </Badge>
                                    )}
                                  </div>
                                </div>

                                <Separator />

                                <div className="grid gap-2 text-sm md:grid-cols-3 md:gap-3">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="text-muted-foreground h-4 w-4" />
                                    <div>
                                      <p className="text-muted-foreground text-xs">Travel Date</p>
                                      <p className="text-foreground font-medium">
                                        {format(new Date(booking.travelDate), "PP")}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <Users className="text-muted-foreground h-4 w-4" />
                                    <div>
                                      <p className="text-muted-foreground text-xs">Travelers</p>
                                      <p className="text-foreground font-medium">
                                        {booking.travelersCount}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <Clock className="text-muted-foreground h-4 w-4" />
                                    <div>
                                      <p className="text-muted-foreground text-xs">Duration</p>
                                      <p className="text-foreground font-medium">
                                        {pkg.duration} days
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-col items-end gap-2 md:gap-3">
                                <div className="text-right">
                                  <p className="text-muted-foreground text-xs">Total Price</p>
                                  <p className="text-foreground text-2xl font-bold">
                                    ${booking.totalPrice.toLocaleString()}
                                  </p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => navigate(`/packages/${pkg.id}`)}
                                    className="border-border"
                                  >
                                    View Package
                                  </Button>
                                  {(booking.paymentStatus === "unpaid" ||
                                    booking.paymentStatus === "rejected") && (
                                    <Button
                                      size="sm"
                                      onClick={() =>
                                        navigate(`/booking-success?bookingId=${booking.id}`)
                                      }
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      Upload Payment
                                    </Button>
                                  )}
                                  {booking.status === "pending" &&
                                    booking.paymentStatus !== "unpaid" && (
                                      <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleCancelBooking(booking.id);
                                        }}
                                      >
                                        Cancel
                                      </Button>
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
                      <div className="bg-muted mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full">
                        <PackageIcon className="text-muted-foreground h-10 w-10" />
                      </div>
                      <h3 className="text-foreground mb-2 text-lg font-semibold">
                        No {status !== "all" && status} bookings yet
                      </h3>
                      <p className="text-muted-foreground mb-4 text-sm">
                        {status === "all"
                          ? "Start your adventure by browsing our amazing travel packages"
                          : `You don't have any ${status} bookings at the moment`}
                      </p>
                      {status === "all" && (
                        <Button onClick={() => navigate("/packages")} className="mt-2">
                          Explore Packages
                        </Button>
                      )}
                    </Card>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </section>
    </MainLayout>
  );
}
