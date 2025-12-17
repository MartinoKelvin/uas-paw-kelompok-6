import { useState } from "react";

export function useFileArray(maxFiles = 10) {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const addFiles = (newFiles) => {
    const fileArray = Array.from(newFiles);
    const remainingSlots = maxFiles - files.length;
    const filesToAdd = fileArray.slice(0, remainingSlots);

    // Create preview URLs
    const newPreviews = filesToAdd.map((file) => URL.createObjectURL(file));

    setFiles((prev) => [...prev, ...filesToAdd]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeFile = (index) => {
    // Revoke the preview URL to prevent memory leak
    URL.revokeObjectURL(previews[index]);

    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const clearFiles = () => {
    // Revoke all preview URLs
    previews.forEach((url) => URL.revokeObjectURL(url));
    setFiles([]);
    setPreviews([]);
  };

  const canAddMore = files.length < maxFiles;

  return {
    files,
    previews,
    addFiles,
    removeFile,
    clearFiles,
    canAddMore,
    fileCount: files.length,
  };
}
