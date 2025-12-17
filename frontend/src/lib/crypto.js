import CryptoJS from "crypto-js";

/**
 * Hash password using SHA-256
 * @param password - Plain text password
 * @returns Hashed password string
 */
export const hashPassword = (password) => {
  return CryptoJS.SHA256(password).toString();
};

/**
 * Verify password against hash
 * @param password - Plain text password to verify
 * @param hash - Stored password hash
 * @returns Boolean indicating if password matches
 */
export const verifyPassword = (password, hash) => {
  const hashedInput = hashPassword(password);
  return hashedInput === hash;
};

/**
 * Generate secure random token for session/authentication
 * @param length - Length of random token (default: 32)
 * @returns Random token string
 */
export const generateToken = (length = 32) => {
  return CryptoJS.lib.WordArray.random(length).toString();
};
