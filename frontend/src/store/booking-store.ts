import { create } from "zustand";
import type { Booking } from "@/types";
import { mockBookings } from "@/data/mock-data";

interface BookingStore {
  bookings: Booking[];
  setBookings: (bookings: Booking[]) => void;
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (
    id: string,
    status: "pending" | "confirmed" | "cancelled" | "completed"
  ) => void;
  markBookingAsReviewed: (id: string) => void;
  uploadPaymentProof: (id: string, proofUrl: string) => void;
  verifyPayment: (id: string) => void;
  rejectPayment: (id: string, reason: string) => void;
  getCompletedBookingsWithoutReview: (touristId: string) => Booking[];
  getBookingsByTourist: (touristId: string) => Booking[];
  getBookingsByPackage: (packageId: string) => Booking[];
  getPendingPaymentVerifications: () => Booking[];
}

export const useBookingStore = create<BookingStore>((set, get) => ({
  bookings: mockBookings, // Initialize with mock data
  setBookings: (bookings) => set({ bookings }),
  addBooking: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })),
  updateBookingStatus: (id, status) =>
    set((state) => ({
      bookings: state.bookings.map((booking) =>
        booking.id === id
          ? {
              ...booking,
              status,
              completedAt: status === "completed" ? new Date().toISOString() : booking.completedAt,
            }
          : booking
      ),
    })),
  markBookingAsReviewed: (id) =>
    set((state) => ({
      bookings: state.bookings.map((booking) =>
        booking.id === id ? { ...booking, hasReviewed: true } : booking
      ),
    })),
  uploadPaymentProof: (id, proofUrl) =>
    set((state) => ({
      bookings: state.bookings.map((booking) =>
        booking.id === id
          ? {
              ...booking,
              paymentProofUrl: proofUrl,
              paymentStatus: "pending_verification",
              paymentProofUploadedAt: new Date().toISOString(),
            }
          : booking
      ),
    })),
  verifyPayment: (id) =>
    set((state) => ({
      bookings: state.bookings.map((booking) =>
        booking.id === id
          ? {
              ...booking,
              paymentStatus: "verified",
              paymentVerifiedAt: new Date().toISOString(),
              status: "confirmed",
              paymentRejectionReason: undefined,
            }
          : booking
      ),
    })),
  rejectPayment: (id, reason) =>
    set((state) => ({
      bookings: state.bookings.map((booking) =>
        booking.id === id
          ? {
              ...booking,
              paymentStatus: "rejected",
              paymentRejectionReason: reason,
            }
          : booking
      ),
    })),
  getCompletedBookingsWithoutReview: (touristId) => {
    const state = get();
    return state.bookings.filter(
      (booking) =>
        booking.touristId === touristId && booking.status === "completed" && !booking.hasReviewed
    );
  },
  getBookingsByTourist: (touristId) =>
    get().bookings.filter((booking) => booking.touristId === touristId),
  getBookingsByPackage: (packageId) =>
    get().bookings.filter((booking) => booking.packageId === packageId),
  getPendingPaymentVerifications: () =>
    get().bookings.filter((booking) => booking.paymentStatus === "pending_verification"),
}));
