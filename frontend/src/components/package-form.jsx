import PropTypes from "prop-types";
import { useRef } from "react";
import { X, Upload, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PackageForm({
  formData,
  imageFiles,
  imagePreviews,
  errors,
  destinations,
  onFieldChange,
  onFilesAdd,
  onFileRemove,
  canAddMoreFiles,
}) {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesAdd(e.target.files);
      // Reset input so same file can be selected again
      e.target.value = "";
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Filter only image files
      const imgFiles = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith("image/")
      );
      if (imgFiles.length > 0) {
        onFilesAdd(imgFiles);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  return (
    <div className="space-y-6">
      {/* Package Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Package Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => onFieldChange("name", e.target.value)}
          placeholder="e.g., Amazing Beach Getaway"
        />
        {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
      </div>

      {/* Destination */}
      <div className="space-y-2">
        <Label htmlFor="destination">Destination *</Label>
        <Select
          value={formData.destinationId}
          onValueChange={(value) => onFieldChange("destinationId", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select destination" />
          </SelectTrigger>
          <SelectContent>
            {destinations.map((dest) => (
              <SelectItem key={dest.id} value={dest.id}>
                {dest.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.destinationId && <p className="text-destructive text-sm">{errors.destinationId}</p>}
      </div>

      {/* Duration and Price */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="duration">Duration (days) *</Label>
          <Input
            id="duration"
            type="number"
            min="1"
            max="30"
            value={formData.duration}
            onChange={(e) => onFieldChange("duration", e.target.value)}
            placeholder="e.g., 5"
          />
          {errors.duration && <p className="text-destructive text-sm">{errors.duration}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price per Person ($) *</Label>
          <Input
            id="price"
            type="number"
            min="1"
            value={formData.price}
            onChange={(e) => onFieldChange("price", e.target.value)}
            placeholder="e.g., 1200"
          />
          {errors.price && <p className="text-destructive text-sm">{errors.price}</p>}
        </div>
      </div>

      {/* Max Travelers */}
      <div className="space-y-2">
        <Label htmlFor="maxTravelers">Maximum Travelers *</Label>
        <Input
          id="maxTravelers"
          type="number"
          min="1"
          max="50"
          value={formData.maxTravelers}
          onChange={(e) => onFieldChange("maxTravelers", e.target.value)}
          placeholder="e.g., 10"
        />
        {errors.maxTravelers && <p className="text-destructive text-sm">{errors.maxTravelers}</p>}
      </div>

      {/* Contact Phone */}
      <div className="space-y-2">
        <Label htmlFor="contactPhone">WhatsApp Contact Number *</Label>
        <Input
          id="contactPhone"
          type="tel"
          value={formData.contactPhone}
          onChange={(e) => onFieldChange("contactPhone", e.target.value)}
          placeholder="e.g., +628123456789 or 08123456789"
        />
        {errors.contactPhone && <p className="text-destructive text-sm">{errors.contactPhone}</p>}
        <p className="text-muted-foreground text-sm">
          WhatsApp number for tourist inquiries (will create wa.me/ link)
        </p>
      </div>

      {/* Itinerary */}
      <div className="space-y-2">
        <Label htmlFor="itinerary">Itinerary *</Label>
        <Textarea
          id="itinerary"
          value={formData.itinerary}
          onChange={(e) => onFieldChange("itinerary", e.target.value)}
          placeholder="Describe the day-by-day itinerary..."
          rows={6}
          className="resize-none"
        />
        {errors.itinerary && <p className="text-destructive text-sm">{errors.itinerary}</p>}
      </div>

      {/* Images - File Upload */}
      <div className="space-y-2">
        <Label htmlFor="images">Package Images * (1-10 images, max 5MB each)</Label>
        <p className="text-muted-foreground text-sm">
          Upload high-quality images (JPG, PNG, GIF, WebP)
        </p>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Drop zone */}
        {canAddMoreFiles && (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
            className="border-border hover:border-primary hover:bg-muted/50 cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors"
          >
            <Upload className="text-muted-foreground mx-auto mb-3 h-10 w-10" />
            <p className="text-sm font-medium">Click to upload or drag and drop</p>
            <p className="text-muted-foreground mt-1 text-xs">
              {imageFiles.length}/10 images uploaded
            </p>
          </div>
        )}

        {/* Image previews */}
        {imagePreviews.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {imagePreviews.map((preview, index) => (
              <Card key={index} className="border-border group relative overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-video">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => onFileRemove(index)}
                        className="h-8 w-8"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-muted-foreground truncate p-2 text-xs">
                    {imageFiles[index]?.name}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No images placeholder */}
        {imagePreviews.length === 0 && (
          <div className="text-muted-foreground flex items-center gap-2 py-2 text-sm">
            <ImageIcon className="h-4 w-4" />
            No images uploaded yet
          </div>
        )}

        {errors.images && <p className="text-destructive text-sm">{errors.images}</p>}
      </div>
    </div>
  );
}

PackageForm.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string,
    destinationId: PropTypes.string,
    duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxTravelers: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    contactPhone: PropTypes.string,
    itinerary: PropTypes.string,
  }).isRequired,
  imageFiles: PropTypes.arrayOf(PropTypes.instanceOf(File)).isRequired,
  imagePreviews: PropTypes.arrayOf(PropTypes.string).isRequired,
  errors: PropTypes.object,
  destinations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onFilesAdd: PropTypes.func.isRequired,
  onFileRemove: PropTypes.func.isRequired,
  canAddMoreFiles: PropTypes.bool,
};
