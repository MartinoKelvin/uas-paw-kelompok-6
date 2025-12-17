import PropTypes from "prop-types";
import { X, Plus, ImageIcon } from "lucide-react";
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

export function EditPackageForm({
  formData,
  images,
  errors,
  destinations,
  onFieldChange,
  onImageAdd,
  onImageRemove,
  onImageChange,
}) {
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

      {/* Images - URL Input */}
      <div className="space-y-2">
        <Label>Package Images * (1-10 images)</Label>
        <p className="text-muted-foreground text-sm">Add image URLs for your package</p>

        {/* Image URL inputs */}
        <div className="space-y-3">
          {images.map((url, index) => (
            <div key={index} className="flex gap-2">
              <div className="flex-1">
                <Input
                  value={url}
                  onChange={(e) => onImageChange(index, e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              {images.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => onImageRemove(index)}
                  className="shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Add more button */}
        {images.length < 10 && (
          <Button type="button" variant="outline" size="sm" onClick={onImageAdd} className="mt-2">
            <Plus className="mr-2 h-4 w-4" />
            Add Image URL
          </Button>
        )}

        {/* Image previews */}
        {images.some((url) => url.trim() !== "") && (
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {images
              .filter((url) => url.trim() !== "")
              .map((url, index) => (
                <Card key={index} className="border-border overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative aspect-video">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3Ctext fill='%23999' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EError%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}

        {/* No images placeholder */}
        {!images.some((url) => url.trim() !== "") && (
          <div className="text-muted-foreground flex items-center gap-2 py-2 text-sm">
            <ImageIcon className="h-4 w-4" />
            No images added yet
          </div>
        )}

        {errors.images && <p className="text-destructive text-sm">{errors.images}</p>}
      </div>
    </div>
  );
}

EditPackageForm.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string,
    destinationId: PropTypes.string,
    duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxTravelers: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    contactPhone: PropTypes.string,
    itinerary: PropTypes.string,
  }).isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  errors: PropTypes.object,
  destinations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onImageAdd: PropTypes.func.isRequired,
  onImageRemove: PropTypes.func.isRequired,
  onImageChange: PropTypes.func.isRequired,
};
