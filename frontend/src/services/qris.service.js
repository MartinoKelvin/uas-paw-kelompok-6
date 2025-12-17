import apiClient from "./api";

// QRIS entity
// Preview QRIS response
// Create QRIS response
// Generate Payment response
// Get all QRIS records (Agent only)
export const getAllQRIS = async () => {
  const response = await apiClient.get("/api/qris");
  return response.data;
};

// Get QRIS by ID (Agent only)
export const getQRISById = async (id) => {
  const response = await apiClient.get(`/api/qris/${id}`);
  return response.data;
};

// Create/Upload new QRIS (Agent only)
export const createQRIS = async (file, feeType, feeValue) => {
  const formData = new FormData();
  formData.append("foto_qr", file);

  if (feeType) {
    formData.append("fee_type", feeType);
  }
  if (feeValue !== undefined) {
    formData.append("fee_value", feeValue.toString());
  }

  const response = await apiClient.post("/api/qris", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Delete QRIS by ID (Agent only)
export const deleteQRIS = async (id) => {
  const response = await apiClient.delete(`/api/qris/${id}`);
  return response.data;
};

// Preview QRIS with amount (no auth required)
export const previewQRIS = async (qrisId, amount) => {
  const response = await apiClient.post("/api/qris/preview", {
    qrisId,
    amount,
  });
  return response.data;
};

// Generate payment QRIS with amount (Tourist/Agent)
export const generatePaymentQRIS = async (amount) => {
  const response = await apiClient.post("/api/payment/generate", {
    amount,
  });
  return response.data;
};
