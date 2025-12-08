import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, XCircle, Eye, Clock, DollarSign } from "lucide-react";
import { useBookingStore } from "@/store/booking-store";
import { useDestinationStore } from "@/store/destination-store";
import { format } from "date-fns";
import { toast } from "sonner";
import type { Booking } from "@/types";

export function PaymentVerification() {
  const { verifyPayment, rejectPayment, getPendingPaymentVerifications } = useBookingStore();
  const { packages } = useDestinationStore();

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

  const pendingPayments = getPendingPaymentVerifications();

  const handleVerify = (bookingId: string) => {
    verifyPayment(bookingId);
    toast.success("Payment verified successfully!");
    setSelectedBooking(null);
  };

  const handleReject = () => {
    if (!selectedBooking) return;
    if (!rejectReason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }

    rejectPayment(selectedBooking.id, rejectReason);
    toast.success("Payment rejected");
    setIsRejectDialogOpen(false);
    setSelectedBooking(null);
    setRejectReason("");
  };

  const getPackageName = (packageId: string) => {
    const pkg = packages.find((p) => p.id === packageId);
    return pkg?.name || "Unknown Package";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Payment Verification</CardTitle>
            <CardDescription>Review and verify tourist payment proofs</CardDescription>
          </div>
          <Badge variant="secondary">
            <Clock className="mr-1 h-3 w-3" />
            {pendingPayments.length} Pending
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {pendingPayments.length === 0 ? (
          <div className="py-12 text-center">
            <CheckCircle className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <p className="text-muted-foreground">No pending payment verifications</p>
          </div>
        ) : (
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead>Proof</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingPayments.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-mono text-sm">{booking.id}</TableCell>
                    <TableCell className="font-medium">
                      {getPackageName(booking.packageId)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="text-muted-foreground h-4 w-4" />
                        <span className="font-semibold">{booking.totalPrice.toFixed(2)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {booking.paymentProofUploadedAt
                        ? format(new Date(booking.paymentProofUploadedAt), "MMM dd, HH:mm")
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {booking.paymentProofUrl ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Eye className="mr-1 h-4 w-4" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Payment Proof</DialogTitle>
                              <DialogDescription>
                                Booking ID: {booking.id} - ${booking.totalPrice.toFixed(2)}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4">
                              <img
                                src={booking.paymentProofUrl}
                                alt="Payment proof"
                                className="h-auto w-full rounded-lg border"
                              />
                            </div>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <span className="text-muted-foreground text-sm">No proof</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleVerify(booking.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Verify
                        </Button>
                        <Dialog
                          open={isRejectDialogOpen && selectedBooking?.id === booking.id}
                          onOpenChange={(open) => {
                            setIsRejectDialogOpen(open);
                            if (!open) {
                              setSelectedBooking(null);
                              setRejectReason("");
                            }
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => setSelectedBooking(booking)}
                            >
                              <XCircle className="mr-1 h-4 w-4" />
                              Reject
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Reject Payment</DialogTitle>
                              <DialogDescription>
                                Provide a reason for rejecting this payment proof
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="reason">Rejection Reason</Label>
                                <Textarea
                                  id="reason"
                                  placeholder="e.g., Payment proof is unclear, amount doesn't match, etc."
                                  value={rejectReason}
                                  onChange={(e) => setRejectReason(e.target.value)}
                                  rows={4}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setIsRejectDialogOpen(false);
                                  setSelectedBooking(null);
                                  setRejectReason("");
                                }}
                              >
                                Cancel
                              </Button>
                              <Button variant="destructive" onClick={handleReject}>
                                Confirm Rejection
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
