"use client";

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  CheckCircle,
  Calendar,
  Users,
  MapPin,
  DollarSign,
  Clock,
  Package as PackageIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PaymentUpload } from "@/components/payment-upload";
import { useDestinationStore } from "@/store/destination-store";
import { useBookingStore } from "@/store/booking-store";
import { format } from "date-fns";
import { useSEO } from "@/hooks/use-seo";

export default function BookingSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { packages, destinations } = useDestinationStore();
  const { bookings, uploadPaymentProof } = useBookingStore();
  const [countdown, setCountdown] = useState(10);

  const bookingId = searchParams.get("bookingId");
  const booking = bookings.find((b) => b.id === bookingId);
  const pkg = booking ? packages.find((p) => p.id === booking.packageId) : null;
  const destination = pkg ? destinations.find((d) => d.id === pkg.destinationId) : null;

  useSEO({
    title: "Booking Successful",
    description:
      "Your travel booking has been confirmed successfully! Get ready for an amazing journey with Wanderlust Inn.",
    keywords: "booking confirmation, booking success, travel confirmed, reservation complete",
  });

  const handlePaymentUpload = async (file: File) => {
    if (!bookingId) return;

    // Simulate file upload (in production, upload to storage service)
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // Create a mock URL (in production, this would be the actual uploaded file URL)
        const mockUrl = URL.createObjectURL(file);
        uploadPaymentProof(bookingId, mockUrl);
        resolve();
      }, 1500);
    });
  };

  useEffect(() => {
    // Redirect after countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!booking || !pkg || !destination) {
    return (
      <div className="bg-muted flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Booking not found</p>
            <Button onClick={() => navigate("/")} className="mt-4">
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="from-primary/5 via-background to-primary/10 flex min-h-screen items-center justify-center bg-linear-to-br p-4">
      <Card className="border-border w-full max-w-3xl shadow-2xl">
        <CardContent className="p-8 md:p-12">
          {/* Success Icon */}
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-foreground mb-2 text-3xl font-bold md:text-4xl">
              Booking Confirmed!
            </h1>
            <p className="text-muted-foreground text-lg">
              Your travel package has been successfully booked
            </p>
          </div>

          <Separator className="my-8" />

          {/* Booking Details */}
          <div className="space-y-6">
            {/* Package Info */}
            <div className="space-y-3">
              <h2 className="text-foreground text-xl font-bold">Package Details</h2>
              <div className="bg-primary/5 rounded-lg p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-foreground text-2xl font-bold">{pkg.name}</h3>
                    <div className="text-muted-foreground mt-2 flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      <span className="text-lg">
                        {destination.name}, {destination.country}
                      </span>
                    </div>
                  </div>
                  <div className="bg-primary/10 rounded-lg px-4 py-2">
                    <p className="text-muted-foreground text-xs">Booking ID</p>
                    <p className="text-foreground font-mono text-sm font-semibold">{booking.id}</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                      <Calendar className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs font-medium">Travel Date</p>
                      <p className="text-foreground font-semibold">
                        {format(new Date(booking.travelDate), "MMM dd, yyyy")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                      <Users className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs font-medium">Travelers</p>
                      <p className="text-foreground font-semibold">
                        {booking.travelersCount}{" "}
                        {booking.travelersCount === 1 ? "Person" : "People"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                      <Clock className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs font-medium">Duration</p>
                      <p className="text-foreground font-semibold">
                        {pkg.duration} {pkg.duration === 1 ? "Day" : "Days"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                      <DollarSign className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs font-medium">Total Price</p>
                      <p className="text-foreground text-lg font-bold">
                        ${booking.totalPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Payment Section */}
            <div className="space-y-3">
              <PaymentUpload
                bookingId={booking.id}
                totalPrice={booking.totalPrice}
                paymentStatus={booking.paymentStatus}
                paymentProofUrl={booking.paymentProofUrl}
                paymentRejectionReason={booking.paymentRejectionReason}
                onUpload={handlePaymentUpload}
              />
            </div>

            <Separator />

            {/* What's Next */}
            <div className="space-y-3">
              <h2 className="text-foreground text-xl font-bold">What's Next?</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                    <span className="text-primary text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-foreground font-semibold">Complete Payment</p>
                    <p className="text-muted-foreground text-sm">
                      Scan the QRIS code and upload your payment proof
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                    <span className="text-primary text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-foreground font-semibold">Payment Verification</p>
                    <p className="text-muted-foreground text-sm">
                      Our travel agent will verify your payment proof
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                    <span className="text-primary text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-foreground font-semibold">Booking Confirmed</p>
                    <p className="text-muted-foreground text-sm">
                      Once verified, your booking will be confirmed automatically
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Actions */}
          <div className="space-y-4">
            {countdown > 0 && (
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-muted-foreground text-sm">
                  You can upload payment proof now or later from your dashboard. Auto-redirecting in{" "}
                  <span className="text-primary font-bold">{countdown}</span> seconds...
                </p>
              </div>
            )}

            <div className="flex flex-col gap-3 md:flex-row">
              <Button
                onClick={() => navigate("/dashboard")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1"
                size="lg"
              >
                <PackageIcon className="mr-2 h-5 w-5" />
                Go to Dashboard
              </Button>
              <Button
                onClick={() => navigate("/packages")}
                variant="outline"
                className="flex-1"
                size="lg"
              >
                Browse More Packages
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
