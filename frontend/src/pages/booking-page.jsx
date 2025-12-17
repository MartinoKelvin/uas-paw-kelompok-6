import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar as CalendarIcon, Users, AlertCircle } from "lucide-react";
import { format, addDays, isAfter, isBefore } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import MainLayout from "@/layout/main-layout";
import { useDestinationStore } from "@/store/destination-store";
import { useBookingStore } from "@/store/booking-store";
import { useAuthStore } from "@/store/auth-store";
import * as packageService from "@/services/package.service";
import * as destinationService from "@/services/destination.service";
import * as bookingService from "@/services/booking.service";
import { useSEO } from "@/hooks/use-seo";

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { destinations, setDestinations } = useDestinationStore();
  const { addBooking } = useBookingStore();
  const { user, isAuthenticated } = useAuthStore();

  const [travelDate, setTravelDate] = useState();
  const [travelersCount, setTravelersCount] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pkg, setPkg] = useState(null);
  const [destination, setDestination] = useState(null);

  // Date validation
  const minDate = addDays(new Date(), 3); // Minimum 3 days from now
  const maxDate = addDays(new Date(), 365); // Maximum 1 year from now

  const isDateValid = (date) => {
    return isAfter(date, minDate) && isBefore(date, maxDate);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/sign-in", { state: { from: `/book/${id}` } });
      return;
    }

    const fetchData = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const packageData = await packageService.getPackageById(id);
        setPkg(packageData);

        if (destinations.length === 0) {
          const destinationsData = await destinationService.getAllDestinations();
          setDestinations(destinationsData);
          const dest = destinationsData.find((d) => d.id === packageData.destinationId);
          setDestination(dest || null);
        } else {
          const dest = destinations.find((d) => d.id === packageData.destinationId);
          setDestination(dest || null);
        }
      } catch (err) {
        console.error("Failed to fetch package:", err);
        toast.error("Failed to load package details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, navigate, id, destinations.length, setDestinations]);

  useSEO({
    title: pkg ? `Book ${pkg.name}` : "Book Package",
    description: pkg
      ? `Book your ${pkg.name} package to ${destination?.name}. Reserve your spot for an unforgettable journey.`
      : "Book your travel package with Wonderfull Inn",
    keywords: "book travel package, reserve vacation, travel booking, package reservation",
  });

  if (isLoading) {
    return (
      <MainLayout>
        <section className="space-y-6 py-2 md:space-y-8 md:py-8 lg:py-12">
          <Skeleton className="h-10 w-32" />
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <Skeleton className="aspect-video w-full rounded-lg" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
              </div>
            </div>
            <div className="lg:col-span-1">
              <Card className="border-border sticky top-8">
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </MainLayout>
    );
  }

  if (!pkg || !destination) {
    return (
      <MainLayout>
        <div className="flex min-h-[50vh] items-center justify-center">
          <Card className="border-border p-8 text-center">
            <p className="text-muted-foreground">Package not found</p>
            <Button onClick={() => navigate("/packages")} className="mt-4" variant="outline">
              Back to Packages
            </Button>
          </Card>
        </div>
      </MainLayout>
    );
  }

  const basePrice = pkg.price * travelersCount;
  const serviceFee = basePrice * 0.05; // 5% service fee
  const tax = basePrice * 0.1; // 10% tax
  const totalPrice = basePrice + serviceFee + tax;

  const handleConfirmBooking = async () => {
    if (!travelDate) {
      toast.error("Please select a travel date");
      return;
    }

    if (!isDateValid(travelDate)) {
      toast.error("Please select a date between 3 days and 1 year from now");
      return;
    }

    if (!user) {
      toast.error("Please sign in to continue");
      navigate("/sign-in");
      return;
    }

    setIsSubmitting(true);

    try {
      // Call real API to create booking
      const booking = await bookingService.createBooking({
        packageId: pkg.id,
        travelDate: travelDate.toISOString().split("T")[0], // Format-MM-DD
        travelersCount,
        totalPrice,
      });

      // Add to local store for immediate UI update
      addBooking(booking);

      toast.success("Booking created successfully!");
      navigate(`/booking-success?bookingId=${booking.id}`);
    } catch (error) {
      console.error("Booking failed:", error);
      toast.error("Failed to create booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <section className="space-y-6 py-2 md:space-y-8 md:py-8 lg:py-12">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => navigate(`/packages/${id}`)}
          className="border-border"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Package Details
        </Button>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Booking Form */}
          <div className="space-y-6 lg:col-span-2">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-foreground text-2xl">Complete Your Booking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Package Info */}
                <div className="bg-muted/30 rounded-lg p-4">
                  <h3 className="text-foreground mb-2 font-semibold">{pkg.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    {destination.name}, {destination.country}
                  </p>
                </div>

                <Separator />

                {/* Travel Date */}
                <div className="space-y-3">
                  <label className="text-foreground text-sm font-medium">Select Travel Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {travelDate ? (
                          format(travelDate, "PPP")
                        ) : (
                          <span className="text-muted-foreground">Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={travelDate}
                        onSelect={setTravelDate}
                        initialFocus
                        disabled={(date) => !isDateValid(date)}
                      />
                    </PopoverContent>
                  </Popover>
                  <p className="text-muted-foreground flex items-center gap-1 text-xs">
                    <AlertCircle className="h-3 w-3" />
                    Book at least 3 days in advance
                  </p>
                </div>

                {/* Number of Travelers */}
                <div className="space-y-3">
                  <label className="text-foreground text-sm font-medium">Number of Travelers</label>
                  <Select
                    value={travelersCount.toString()}
                    onValueChange={(value) => setTravelersCount(parseInt(value))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: pkg.maxTravelers }, (_, i) => i + 1).map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            {num} {num === 1 ? "Traveler" : "Travelers"}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Traveler Info */}
                <div className="bg-muted/30 space-y-2 rounded-lg p-4">
                  <p className="text-muted-foreground text-sm">Booked by</p>
                  <p className="text-foreground font-medium">{user?.name}</p>
                  <p className="text-muted-foreground text-sm">{user?.email}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="border-border sticky top-8">
              <CardHeader>
                <CardTitle className="text-foreground">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Package</span>
                    <span className="text-foreground font-medium">{pkg.name}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Price per person</span>
                    <span className="text-foreground font-medium">
                      ${pkg.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Travelers</span>
                    <span className="text-foreground font-medium">{travelersCount}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="text-foreground font-medium">{pkg.duration} days</span>
                  </div>

                  {travelDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Travel date</span>
                      <span className="text-foreground font-medium">
                        {format(travelDate, "PP")}
                      </span>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">${basePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service fee (5%)</span>
                    <span className="text-foreground">${serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span className="text-foreground">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between">
                  <span className="text-foreground font-semibold">Total</span>
                  <span className="text-foreground text-2xl font-bold">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <Button
                  onClick={handleConfirmBooking}
                  disabled={!travelDate || (travelDate && !isDateValid(travelDate)) || isSubmitting}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
                  size="lg"
                >
                  {isSubmitting ? "Processing..." : "Confirm Booking"}
                </Button>

                <p className="text-muted-foreground text-center text-xs">
                  By confirming, you agree to our terms and conditions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
