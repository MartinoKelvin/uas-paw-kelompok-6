import { create } from "zustand";
import * as bookingService from "@/services/booking.service";
import * as paymentService from "@/services/payment.service";

export const useBookingStore = create((set, get) => ({
  bookings: [],
  pendingPayments: [],
  isLoading: false,
  error: null,

  setBookings: (bookings) => set({ bookings }),

  fetchBookings: async () => {
    set({ isLoading: true, error: null });
    try {
      const bookings = await bookingService.getAllBookings();
      set({ bookings, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchBookingsByTourist: async (touristId) => {
    set({ isLoading: true, error: null });
    try {
      const bookings = await bookingService.getBookingsByTourist(touristId);
      set({ bookings, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchBookingsByPackage: async (packageId) => {
    set({ isLoading: true, error: null });
    try {
      const bookings = await bookingService.getBookingsByPackage(packageId);
      set({ bookings, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchPendingPayments: async () => {
    set({ isLoading: true, error: null });
    try {
      const pendingPayments = await paymentService.getPendingPayments();
      // Convert to Booking type if needed
      set({
        pendingPayments: pendingPayments,
        isLoading: false,
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addBooking: (booking) =>
    set((state) => ({
      bookings: [...state.bookings, booking],
    })),

  createBooking: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const booking = await bookingService.createBooking(data);
      set((state) => ({
        bookings: [...state.bookings, booking],
        isLoading: false,
      }));
      return booking;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  updateBookingStatus: async (id, status) => {
    set({ isLoading: true, error: null });
    try {
      await bookingService.updateBookingStatus({ id, status });
      set((state) => ({
        bookings: state.bookings.map((booking) =>
          booking.id === id
            ? {
                ...booking,
                status,
                completedAt:
                  status === "completed" ? new Date().toISOString() : booking.completedAt,
              }
            : booking
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  markBookingAsReviewed: (id) =>
    set((state) => ({
      bookings: state.bookings.map((booking) =>
        booking.id === id ? { ...booking, hasReviewed: true } : booking
      ),
    })),

  uploadPaymentProof: async (id, file) => {
    set({ isLoading: true, error: null });
    try {
      const result = await paymentService.uploadPaymentProof(id, file);
      set((state) => ({
        bookings: state.bookings.map((booking) =>
          booking.id === id
            ? {
                ...booking,
                paymentProofUrl: result.paymentProofUrl,
                paymentStatus: result.paymentStatus,
                paymentProofUploadedAt: new Date().toISOString(),
              }
            : booking
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  verifyPayment: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await paymentService.verifyPayment(id);
      set((state) => ({
        bookings: state.bookings.map((booking) =>
          booking.id === id
            ? {
                ...booking,
                paymentStatus: "verified",
                paymentVerifiedAt: new Date().toISOString(),
                status: "confirmed",
                paymentRejectionReason: null,
              }
            : booking
        ),
        pendingPayments: state.pendingPayments.filter((p) => p.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  rejectPayment: async (id, reason) => {
    set({ isLoading: true, error: null });
    try {
      await paymentService.rejectPayment(id, reason);
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
        pendingPayments: state.pendingPayments.filter((p) => p.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

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
