"use client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  Package as PackageIcon,
  Users,
  DollarSign,
  Plus,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PaymentVerification } from "@/components/payment-verification";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/layout/main-layout";
import { useAuthStore } from "@/store/auth-store";
import { useBookingStore } from "@/store/booking-store";
import { useSEO } from "@/hooks/use-seo";
import { useDestinationStore } from "@/store/destination-store";
import { mockDestinations, mockPackages } from "@/data/mock-data";

export default function AgentDashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { bookings, updateBookingStatus } = useBookingStore();
  const { destinations, packages, setDestinations, setPackages } = useDestinationStore();

  useSEO({
    title: "Agent Dashboard",
    description:
      "Manage your travel packages, track bookings, and monitor your business performance as a travel agent.",
    keywords: "agent dashboard, package management, booking management, travel agent tools",
  });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "agent") {
      navigate("/sign-in");
      return;
    }
    setDestinations(mockDestinations);
    setPackages(mockPackages);
  }, [isAuthenticated, user, navigate, setDestinations, setPackages]);

  // Get packages created by this agent
  const myPackages = packages.filter((pkg) => pkg.agentId === user?.id);

  // Get bookings for agent's packages
  const myBookings = bookings.filter((booking) =>
    myPackages.some((pkg) => pkg.id === booking.packageId)
  );

  const stats = {
    totalPackages: myPackages.length,
    totalBookings: myBookings.length,
    pendingBookings: myBookings.filter((b) => b.status === "pending").length,
    confirmedBookings: myBookings.filter((b) => b.status === "confirmed").length,
    totalRevenue: myBookings
      .filter((b) => b.status === "confirmed")
      .reduce((sum, b) => sum + b.totalPrice, 0),
  };

  // Performance metrics
  const averageBookingValue =
    stats.confirmedBookings > 0 ? stats.totalRevenue / stats.confirmedBookings : 0;

  const conversionRate =
    myPackages.length > 0 ? ((stats.totalBookings / myPackages.length) * 100).toFixed(1) : "0";

  const averageRating =
    myPackages.length > 0
      ? (myPackages.reduce((sum, pkg) => sum + (pkg.rating || 0), 0) / myPackages.length).toFixed(1)
      : "0.0";

  // Package performance
  const packageStats = myPackages
    .map((pkg) => {
      const pkgBookings = myBookings.filter((b) => b.packageId === pkg.id);
      const revenue = pkgBookings
        .filter((b) => b.status === "confirmed")
        .reduce((sum, b) => sum + b.totalPrice, 0);
      return {
        ...pkg,
        bookingsCount: pkgBookings.length,
        revenue,
      };
    })
    .sort((a, b) => b.revenue - a.revenue);

  const handleUpdateStatus = (bookingId: string, status: "confirmed" | "cancelled") => {
    updateBookingStatus(bookingId, status);
    toast.success(`Booking ${status === "confirmed" ? "confirmed" : "cancelled"} successfully!`);
  };

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

  return (
    <MainLayout>
      <section className="space-y-6 py-2 md:space-y-8 md:py-8 lg:py-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-foreground text-3xl font-bold md:text-4xl">Agent Dashboard</h1>
            <p className="text-muted-foreground mt-2 text-base md:text-lg">
              Welcome back, {user?.name}!
            </p>
          </div>
          <Button
            onClick={() => navigate("/agent/packages/new")}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Package
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                Total Packages
              </CardTitle>
              <PackageIcon className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-foreground text-2xl font-bold">{stats.totalPackages}</div>
              <p className="text-muted-foreground mt-1 text-xs">Avg Rating: {averageRating} ⭐</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                Total Bookings
              </CardTitle>
              <Users className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-foreground text-2xl font-bold">{stats.totalBookings}</div>
              <p className="text-muted-foreground mt-1 text-xs">
                {conversionRate} bookings/package
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-muted-foreground text-sm font-medium">Pending</CardTitle>
              <AlertCircle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-foreground text-2xl font-bold">{stats.pendingBookings}</div>
              <p className="text-muted-foreground mt-1 text-xs">Needs attention</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-muted-foreground text-sm font-medium">Confirmed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-foreground text-2xl font-bold">{stats.confirmedBookings}</div>
              <p className="text-muted-foreground mt-1 text-xs">
                ${averageBookingValue.toFixed(0)} avg value
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-muted-foreground text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-foreground text-2xl font-bold">
                ${stats.totalRevenue.toLocaleString()}
              </div>
              <p className="text-muted-foreground mt-1 text-xs">
                From {stats.confirmedBookings} bookings
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Button
                onClick={() => navigate("/agent/packages/new")}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Create New Package
              </Button>
              <Button
                onClick={() => navigate("/manage-packages")}
                variant="outline"
                className="border-border"
              >
                Manage Packages
              </Button>
            </CardContent>
          </Card>

          {/* Revenue Chart */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-sm">Total Revenue</p>
                    <p className="text-foreground text-2xl font-bold">
                      ${stats.totalRevenue.toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className="text-primary h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Confirmed</span>
                    <span className="text-foreground font-medium">
                      ${stats.totalRevenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-secondary h-2 overflow-hidden rounded-full">
                    <div
                      className="bg-primary h-full"
                      style={{
                        width:
                          stats.confirmedBookings > 0
                            ? `${(stats.confirmedBookings / stats.totalBookings) * 100}%`
                            : "0%",
                      }}
                    />
                  </div>
                  <div className="text-muted-foreground flex items-center justify-between text-xs">
                    <span>{stats.confirmedBookings} confirmed bookings</span>
                    <span>{stats.pendingBookings} pending</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Package Performance Chart */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Package Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {packageStats.slice(0, 5).map((pkg, index) => {
                const maxRevenue = packageStats[0]?.revenue || 1;
                const percentage = (pkg.revenue / maxRevenue) * 100;
                return (
                  <div key={pkg.id} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">#{index + 1}</span>
                        <span className="text-foreground line-clamp-1 font-medium">{pkg.name}</span>
                      </div>
                      <span className="text-foreground font-semibold">
                        ${pkg.revenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-secondary h-2 flex-1 overflow-hidden rounded-full">
                        <div
                          className="bg-primary h-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-muted-foreground text-xs whitespace-nowrap">
                        {pkg.bookingsCount} bookings
                      </span>
                    </div>
                  </div>
                );
              })}
              {packageStats.length === 0 && (
                <p className="text-muted-foreground py-4 text-center text-sm">
                  No packages yet. Create your first package to start earning!
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Bookings Status Distribution */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Booking Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Visual Chart */}
              <div className="flex h-40 items-end justify-between gap-2">
                {[
                  { label: "Pending", count: stats.pendingBookings, color: "bg-yellow-500" },
                  { label: "Confirmed", count: stats.confirmedBookings, color: "bg-green-500" },
                  {
                    label: "Cancelled",
                    count: myBookings.filter((b) => b.status === "cancelled").length,
                    color: "bg-red-500",
                  },
                ].map((item) => {
                  const maxCount =
                    Math.max(
                      stats.pendingBookings,
                      stats.confirmedBookings,
                      myBookings.filter((b) => b.status === "cancelled").length
                    ) || 1;
                  const height = (item.count / maxCount) * 100;
                  return (
                    <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
                      <div className="flex h-32 w-full items-end justify-center">
                        <div
                          className={`w-full ${item.color} rounded-t transition-all duration-500`}
                          style={{ height: `${height}%` }}
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-foreground text-lg font-bold">{item.count}</p>
                        <p className="text-muted-foreground text-xs">{item.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm bg-yellow-500" />
                  <span className="text-muted-foreground text-sm">Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm bg-green-500" />
                  <span className="text-muted-foreground text-sm">Confirmed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm bg-red-500" />
                  <span className="text-muted-foreground text-sm">Cancelled</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Packages - Keep original */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Top Performing Packages</CardTitle>
          </CardHeader>
          <CardContent>
            {packageStats.length > 0 ? (
              <div className="space-y-3">
                {packageStats.slice(0, 3).map((pkg) => (
                  <div key={pkg.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-foreground text-sm font-medium">{pkg.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {pkg.bookingsCount} bookings • ⭐ {pkg.rating?.toFixed(1) || "N/A"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-foreground text-sm font-bold">
                        ${pkg.revenue.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground py-4 text-center text-sm">
                No packages yet. Create your first package to get started!
              </p>
            )}
          </CardContent>
        </Card>

        {/* Payment Verification */}
        <PaymentVerification />

        {/* Bookings Management */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Manage Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All ({stats.totalBookings})</TabsTrigger>
                <TabsTrigger value="pending">Pending ({stats.pendingBookings})</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmed ({stats.confirmedBookings})</TabsTrigger>
              </TabsList>

              {["all", "pending", "confirmed"].map((tab) => (
                <TabsContent key={tab} value={tab}>
                  <div className="border-border overflow-hidden rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Package</TableHead>
                          <TableHead>Travel Date</TableHead>
                          <TableHead>Travelers</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {myBookings
                          .filter((b) => tab === "all" || b.status === tab)
                          .map((booking) => {
                            const pkg = packages.find((p) => p.id === booking.packageId);
                            if (!pkg) return null;

                            return (
                              <TableRow key={booking.id}>
                                <TableCell className="font-medium">{pkg.name}</TableCell>
                                <TableCell>{format(new Date(booking.travelDate), "PP")}</TableCell>
                                <TableCell>{booking.travelersCount}</TableCell>
                                <TableCell>${booking.totalPrice.toLocaleString()}</TableCell>
                                <TableCell>
                                  <Badge
                                    className={`${getStatusColor(booking.status)} flex w-fit items-center gap-1`}
                                  >
                                    {getStatusIcon(booking.status)}
                                    {booking.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  {booking.status === "pending" && (
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                                        onClick={() => handleUpdateStatus(booking.id, "confirmed")}
                                      >
                                        Confirm
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                                        onClick={() => handleUpdateStatus(booking.id, "cancelled")}
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>

                    {myBookings.filter((b) => tab === "all" || b.status === tab).length === 0 && (
                      <div className="p-12 text-center">
                        <p className="text-muted-foreground">
                          No {tab !== "all" && tab} bookings found
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* My Packages */}
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-foreground">My Packages</CardTitle>
            <Button
              variant="outline"
              onClick={() => navigate("/agent/packages")}
              className="border-border"
            >
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {myPackages.slice(0, 6).map((pkg) => {
                const destination = destinations.find((d) => d.id === pkg.destinationId);
                const pkgBookings = bookings.filter((b) => b.packageId === pkg.id);

                return (
                  <Card
                    key={pkg.id}
                    className="border-border cursor-pointer transition-shadow hover:shadow-lg"
                    onClick={() => navigate(`/packages/${pkg.id}`)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-foreground line-clamp-1 font-semibold">{pkg.name}</h3>
                          <p className="text-muted-foreground text-sm">{destination?.name}</p>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {pkgBookings.length} bookings
                          </span>
                          <span className="text-foreground font-bold">${pkg.price}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </section>
    </MainLayout>
  );
}
