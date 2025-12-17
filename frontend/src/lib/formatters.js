export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateObj);
};

export const formatShortDate = (date) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(dateObj);
};

export const pluralize = (count, singular, plural) => {
  if (count === 1) return singular;
  return plural || `${singular}s`;
};

export const truncate = (text, length) => {
  if (text.length <= length) return text;
  return `${text.slice(0, length)}...`;
};

export const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const calculateDaysDifference = (date1, date2) => {
  const d1 = typeof date1 === "string" ? new Date(date1) : date1;
  const d2 = typeof date2 === "string" ? new Date(date2) : date2;
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Format Indonesian phone number to WhatsApp link format
 * Converts numbers like "08123456789" or "+628123456789" to "628123456789"
 * @param phoneNumber - Phone number in various formats
 * @returns Formatted number suitable for wa.me/ link
 */
export const formatWhatsAppNumber = (phoneNumber) => {
  // Remove all non-digit characters
  const digitsOnly = phoneNumber.replace(/\D/g, "");

  // If starts with 0, replace with 62
  if (digitsOnly.startsWith("0")) {
    return "62" + digitsOnly.slice(1);
  }

  // If already starts with 62, return as-is
  if (digitsOnly.startsWith("62")) {
    return digitsOnly;
  }

  // Otherwise, assume it's Indonesian number without country code
  return "62" + digitsOnly;
};

/**
 * Generate WhatsApp web link from phone number
 * @param phoneNumber - Phone number in any format
 * @param message - Optional pre-filled message
 * @returns Complete WhatsApp web URL
 */
export const getWhatsAppLink = (phoneNumber, message) => {
  const formattedNumber = formatWhatsAppNumber(phoneNumber);
  const baseUrl = `https://wa.me/${formattedNumber}`;

  if (message) {
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }

  return baseUrl;
};
