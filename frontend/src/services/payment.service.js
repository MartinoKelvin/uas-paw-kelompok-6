import apiClient from "./api";

// Upload payment proof (Tourist)
export const uploadPaymentProof = async (bookingId, file) => {
  const formData = new FormData();
  formData.append("file", file); // Backend expects "file" or "proof"

  const response = await apiClient.post(`/api/bookings/${bookingId}/payment-proof`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Verify payment (Agent) - uses PUT method
export const verifyPayment = async (bookingId) => {
  const response = await apiClient.put(`/api/bookings/${bookingId}/payment-verify`);
  return response.data;
};

// Reject payment (Agent) - uses PUT method
export const rejectPayment = async (bookingId, reason) => {
  const response = await apiClient.put(`/api/bookings/${bookingId}/payment-reject`, { reason });
  return response.data;
};

// Get pending payments (Agent)
export const getPendingPayments = async () => {
  const response = await apiClient.get("/api/bookings/payment/pending");
  return response.data;
};

// Generate QRIS for payment
export const generateQRIS = async (data) => {
  const response = await apiClient.post("/api/payment/generate", data);
  return response.data;
};
