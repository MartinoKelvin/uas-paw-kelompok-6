export const ROUTES = {
  HOME: "/",
  PACKAGES: "/packages",
  ABOUT: "/about",
  CONTACT: "/contact",
  HELP: "/help",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  PROFILE: "/profile",
  TOURIST_DASHBOARD: "/dashboard/tourist",
  AGENT_DASHBOARD: "/dashboard/agent",
  BOOKING: (id) => `/book/${id}`,
  PACKAGE_DETAIL: (id) => `/package/${id}`,
  ALL_BOOKINGS: "/bookings",
  MANAGE_PACKAGES: "/manage-packages",
  CREATE_PACKAGE: "/create-package",
  EDIT_PACKAGE: (id) => `/edit-package/${id}`,
  BOOKING_SUCCESS: "/booking-success",
};

export const VALIDATION_RULES = {
  NAME_MIN_LENGTH: 3,
  PASSWORD_MIN_LENGTH: 8,
  COMMENT_MIN_LENGTH: 10,
  COMMENT_MAX_LENGTH: 500,
  ITINERARY_MIN_LENGTH: 20,
  PACKAGE_NAME_MIN_LENGTH: 5,
  DURATION_MIN: 1,
  DURATION_MAX: 30,
  PRICE_MIN: 1,
  PRICE_MAX: 1000000,
  TRAVELERS_MIN: 1,
  TRAVELERS_MAX: 50,
  IMAGES_MIN: 1,
  IMAGES_MAX: 10,
};

export const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
};

export const USER_ROLES = {
  TOURIST: "tourist",
  AGENT: "agent",
};

export const DATE_FORMATS = {
  FULL: "MMMM d, yyyy",
  SHORT: "MMM d, yyyy",
  DISPLAY: "PP",
  ISO: "yyyy-MM-dd",
};

/**
 * API Configuration
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:6543";
export const API_TIMEOUT = 10000; // 10 seconds

/**
 * File Upload Limits
 */
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
