export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Hashed password (optional for security)
  role: "tourist" | "agent";
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  photoUrl: string;
  country: string;
}

export interface Package {
  id: string;
  agentId: string;
  destinationId: string;
  name: string;
  duration: number;
  price: number;
  itinerary: string;
  maxTravelers: number;
  contactPhone: string; // Contact phone number for package inquiries
  rating?: number;
  reviewsCount?: number;
  images: string[];
}

export interface Booking {
  id: string;
  packageId: string;
  touristId: string;
  travelDate: string;
  travelersCount: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: string;
  completedAt?: string;
  hasReviewed?: boolean;
  paymentStatus?: "unpaid" | "pending_verification" | "verified" | "rejected";
  paymentProofUrl?: string;
  paymentProofUploadedAt?: string;
  paymentVerifiedAt?: string;
  paymentRejectionReason?: string;
}

export interface Review {
  id: string;
  packageId: string;
  touristId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface BookingFormData {
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  guests: number;
}
