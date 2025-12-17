import { z } from "zod";

// User Authentication Schemas
export const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  role: z.enum(["tourist", "agent"], {
    message: "Please select a role",
  }),
});

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must not exceed 50 characters"),
    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    role: z.enum(["tourist", "agent"], {
      message: "Please select a role",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Booking Schema
export const bookingSchema = z.object({
  travelDate: z
    .date({
      message: "Please select a travel date",
    })
    .refine((date) => date > new Date(), {
      message: "Travel date must be in the future",
    }),
  travelersCount: z
    .number()
    .min(1, "At least 1 traveler is required")
    .max(20, "Maximum 20 travelers allowed"),
});

// Package Schema
export const packageSchema = z.object({
  name: z
    .string()
    .min(1, "Package name is required")
    .min(5, "Package name must be at least 5 characters")
    .max(100, "Package name must not exceed 100 characters"),
  destinationId: z.string().min(1, "Please select a destination"),
  duration: z
    .number()
    .min(1, "Duration must be at least 1 day")
    .max(30, "Duration cannot exceed 30 days"),
  price: z.number().min(1, "Price must be greater than 0").max(1000000, "Price seems too high"),
  itinerary: z
    .string()
    .min(1, "Itinerary is required")
    .min(20, "Please provide a detailed itinerary (at least 20 characters)"),
  maxTravelers: z
    .number()
    .min(1, "At least 1 traveler must be allowed")
    .max(50, "Maximum 50 travelers allowed"),
  contactPhone: z
    .string()
    .min(1, "Contact phone number is required")
    .regex(
      /^(\+?62|0)\d{8,13}$/,
      "Please enter a valid Indonesian phone number (e.g., +628123456789 or 08123456789)"
    ),
  images: z
    .array(z.string())
    .min(1, "At least one image is required")
    .max(10, "Maximum 10 images allowed"),
});

// Review Schema
export const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, "Rating must be at least 1 star")
    .max(5, "Rating cannot exceed 5 stars"),
  comment: z
    .string()
    .min(1, "Review comment is required")
    .min(10, "Please provide a more detailed review (at least 10 characters)")
    .max(500, "Review must not exceed 500 characters"),
});

// Contact Form Schema
export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").min(3, "Name must be at least 3 characters"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  subject: z
    .string()
    .min(1, "Subject is required")
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must not exceed 100 characters"),
  message: z
    .string()
    .min(1, "Message is required")
    .min(20, "Please provide a more detailed message (at least 20 characters)")
    .max(1000, "Message must not exceed 1000 characters"),
});

// Type exports
