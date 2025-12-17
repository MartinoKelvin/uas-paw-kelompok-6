import { useState } from "react";

export function useImageArray(initialImages = [""]) {
  const [images, setImages] = useState(initialImages);

  const addImage = () => {
    setImages((prev) => [...prev, ""]);
  };

  const removeImage = (index) => {
    if (images.length > 1) {
      setImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const updateImage = (index, value) => {
    setImages((prev) => prev.map((img, i) => (i === index ? value : img)));
  };

  const resetImages = (newImages = [""]) => {
    setImages(newImages);
  };

  return { images, addImage, removeImage, updateImage, resetImages };
}
