import { useState } from "react";

export function useImageArray(initialImages: string[] = [""]) {
  const [images, setImages] = useState<string[]>(initialImages);

  const addImage = () => {
    setImages((prev) => [...prev, ""]);
  };

  const removeImage = (index: number) => {
    if (images.length > 1) {
      setImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const updateImage = (index: number, value: string) => {
    setImages((prev) => prev.map((img, i) => (i === index ? value : img)));
  };

  const resetImages = (newImages: string[] = [""]) => {
    setImages(newImages);
  };

  return { images, addImage, removeImage, updateImage, resetImages };
}
