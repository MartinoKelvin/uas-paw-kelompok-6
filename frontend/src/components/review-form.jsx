import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useReviewStore } from "@/store/review-store";
import { useAuthStore } from "@/store/auth-store";
import { useBookingStore } from "@/store/booking-store";
import { reviewSchema } from "@/lib/validations";
import { useFormValidation } from "@/hooks/use-form-validation";
import { StarRating } from "@/components/star-rating";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import * as reviewService from "@/services/review.service";

export function ReviewForm({ packageId, packageName, bookingId, open, onOpenChange }) {
  const { user } = useAuthStore();
  const { addReview } = useReviewStore();
  const { bookings, markBookingAsReviewed } = useBookingStore();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canReview, setCanReview] = useState(false);
  const [reviewMessage, setReviewMessage] = useState("");
  const { errors, validate } = useFormValidation(reviewSchema);

  // Check if user can review this booking
  useEffect(() => {
    Promise.resolve().then(() => {
      if (!bookingId || !user) {
        setCanReview(true); // Allow review without booking validation (for general reviews)
        setReviewMessage("");
        return;
      }

      const booking = bookings.find((b) => b.id === bookingId);

      if (!booking) {
        setCanReview(false);
        setReviewMessage("Booking not found");
        return;
      }

      // Check if booking is completed
      if (booking.status !== "completed" || !booking.completedAt) {
        setCanReview(false);
        setReviewMessage("You can only review packages after your trip is completed");
        return;
      }

      // Check if already reviewed
      if (booking.hasReviewed) {
        setCanReview(false);
        setReviewMessage("You have already reviewed this package");
        return;
      }

      setCanReview(true);
      setReviewMessage("");
    });
  }, [bookingId, bookings, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to submit a review");
      return;
    }

    // Validate booking eligibility
    if (bookingId && !canReview) {
      toast.error(reviewMessage || "You cannot review this package at this time");
      return;
    }

    if (!validate({ rating, comment })) return;

    setIsSubmitting(true);

    try {
      // Call real API to create review
      const newReview = await reviewService.createReview({
        packageId,
        ...(bookingId && { bookingId }), // Only include bookingId if it exists
        rating,
        comment,
      });

      // Add to local store for immediate UI update
      addReview(newReview);

      // Mark booking as reviewed
      if (bookingId) {
        markBookingAsReviewed(bookingId);
      }

      onOpenChange(false);
      setRating(5);
      setComment("");
      toast.success("Review submitted successfully!");
    } catch (error) {
      console.error("Failed to submit review:", error);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>
            Share your experience with <span className="font-semibold">{packageName}</span>
          </DialogDescription>
        </DialogHeader>

        {/* Validation Alert */}
        {bookingId && reviewMessage && (
          <Alert variant={canReview ? "default" : "destructive"}>
            {canReview ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <AlertDescription>{reviewMessage}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Your Rating</Label>
            <div className="flex items-center gap-2">
              <StarRating rating={rating} size={32} interactive onRatingChange={setRating} />
              <span className="text-muted-foreground ml-2 text-sm">
                {rating} {rating === 1 ? "star" : "stars"}
              </span>
            </div>
            {errors.rating && <p className="text-destructive text-sm">{errors.rating}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Your Review</Label>
            <Textarea
              id="comment"
              placeholder="Share your experience with this package... (minimum 10 characters)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
              className={errors.comment ? "border-destructive" : ""}
            />
            <div className="flex items-center justify-between">
              {errors.comment ? (
                <p className="text-destructive text-sm">{errors.comment}</p>
              ) : (
                <p className="text-muted-foreground text-sm">Minimum 10 characters</p>
              )}
              <p className="text-muted-foreground text-sm">{comment.length}/500</p>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || (!!bookingId && !canReview)}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

ReviewForm.propTypes = {
  packageId: PropTypes.string.isRequired,
  packageName: PropTypes.string.isRequired,
  bookingId: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
};
