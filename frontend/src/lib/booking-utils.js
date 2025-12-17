import { CheckCircle2, XCircle, AlertCircle, Clock, FileCheck, Upload } from "lucide-react";

/**
 * Status configurations for bookings
 * Centralized status logic to avoid repetition across components
 */
export const BOOKING_STATUS = {
  pending: {
    label: "Pending",
    color: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    icon: AlertCircle,
  },
  confirmed: {
    label: "Confirmed",
    color: "bg-green-500/10 text-green-700 dark:text-green-400",
    icon: CheckCircle2,
  },
  completed: {
    label: "Completed",
    color: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-destructive/10 text-destructive",
    icon: XCircle,
  },
  payment_pending: {
    label: "Payment Pending",
    color: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
    icon: Clock,
  },
  payment_uploaded: {
    label: "Payment Uploaded",
    color: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
    icon: Upload,
  },
  payment_verified: {
    label: "Payment Verified",
    color: "bg-green-500/10 text-green-700 dark:text-green-400",
    icon: FileCheck,
  },
};

/**
 * Get status icon component
 * @param {string} status - Booking status
 * @returns {React.ComponentType} Icon component
 */
export const getStatusIcon = (status) => {
  const config = BOOKING_STATUS[status] || BOOKING_STATUS.pending;
  return config.icon;
};

/**
 * Get status color classes
 * @param {string} status - Booking status
 * @returns {string} Tailwind color classes
 */
export const getStatusColor = (status) => {
  const config = BOOKING_STATUS[status] || BOOKING_STATUS.pending;
  return config.color;
};

/**
 * Get status label
 * @param {string} status - Booking status
 * @returns {string} Human-readable label
 */
export const getStatusLabel = (status) => {
  const config = BOOKING_STATUS[status] || BOOKING_STATUS.pending;
  return config.label;
};

/**
 * Get full status config
 * @param {string} status - Booking status
 * @returns {object} Full status configuration
 */
export const getStatusConfig = (status) => {
  return BOOKING_STATUS[status] || BOOKING_STATUS.pending;
};

/**
 * Check if booking can be cancelled
 * @param {string} status - Booking status
 * @returns {boolean}
 */
export const canCancelBooking = (status) => {
  return ["pending", "payment_pending"].includes(status);
};

/**
 * Check if booking can be reviewed
 * @param {string} status - Booking status
 * @returns {boolean}
 */
export const canReviewBooking = (status) => {
  return status === "completed";
};

/**
 * Check if payment can be uploaded
 * @param {string} status - Booking status
 * @returns {boolean}
 */
export const canUploadPayment = (status) => {
  return ["pending", "payment_pending"].includes(status);
};
