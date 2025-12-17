// Helper to convert relative image URLs to full URLs
// Backend returns paths like "/packages/uuid.jpg" which need the API base URL prepended

import { API_BASE_URL } from "./constants";

/**
 * Get the full image URL from a relative path
 * @param imagePath - The image path from backend (e.g., "/packages/uuid.jpg")
 * @returns Full URL (e.g., "http://localhost:6543/packages/uuid.jpg")
 */
export function getImageUrl(imagePath) {
  if (!imagePath) {
    return "/placeholder-image.jpg"; // fallback placeholder
  }

  // If already a full URL, return as-is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // If starts with /, prepend API base URL
  if (imagePath.startsWith("/")) {
    return `${API_BASE_URL}${imagePath}`;
  }

  // Otherwise, assume it's a relative path and prepend API base URL with /
  return `${API_BASE_URL}/${imagePath}`;
}

/**
 * Get array of full image URLs
 * @param images - Array of image paths from backend
 * @returns Array of full URLs
 */
export function getImageUrls(images) {
  if (!images || images.length === 0) {
    return ["/placeholder-image.jpg"];
  }
  return images.map(getImageUrl);
}
