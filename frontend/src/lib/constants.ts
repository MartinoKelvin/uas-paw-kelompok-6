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
  BOOKING: (id: string) => `/book/${id}`,
  PACKAGE_DETAIL: (id: string) => `/package/${id}`,
  ALL_BOOKINGS: "/bookings",
  MANAGE_PACKAGES: "/manage-packages",
  CREATE_PACKAGE: "/create-package",
  EDIT_PACKAGE: (id: string) => `/edit-package/${id}`,
  BOOKING_SUCCESS: "/booking-success",
} as const;

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
} as const;

export const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
} as const;

export const USER_ROLES = {
  TOURIST: "tourist",
  AGENT: "agent",
} as const;

export const DATE_FORMATS = {
  FULL: "MMMM d, yyyy",
  SHORT: "MMM d, yyyy",
  DISPLAY: "PP",
  ISO: "yyyy-MM-dd",
} as const;
