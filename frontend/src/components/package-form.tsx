import { Plus, X } from "lucide-react";
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
import type { Destination } from "@/types";
import type { PackageFormData } from "@/lib/validations";

interface PackageFormProps {
  formData: {
    name: string;
    destinationId: string;
    duration: string;
    price: string;
    itinerary: string;
    maxTravelers: string;
    contactPhone: string;
  };
  images: string[];
  errors: Partial<Record<keyof PackageFormData, string>>;
  destinations: Destination[];
  onFieldChange: (field: string, value: string) => void;
  onImageAdd: () => void;
  onImageRemove: (index: number) => void;
  onImageChange: (index: number, value: string) => void;
}

export function PackageForm({
  formData,
  images,
  errors,
  destinations,
  onFieldChange,
  onImageAdd,
  onImageRemove,
  onImageChange,
}: PackageFormProps) {
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
        <Label htmlFor="contactPhone">Contact Phone Number *</Label>
        <Input
          id="contactPhone"
          type="tel"
          value={formData.contactPhone}
          onChange={(e) => onFieldChange("contactPhone", e.target.value)}
          placeholder="e.g., +62 812-3456-7890"
        />
        {errors.contactPhone && <p className="text-destructive text-sm">{errors.contactPhone}</p>}
        <p className="text-muted-foreground text-sm">
          Contact number for tourist inquiries about this package
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

      {/* Images */}
      <div className="space-y-2">
        <Label>Package Images *</Label>
        <p className="text-muted-foreground text-sm">Add 1-10 image URLs</p>

        <div className="space-y-3">
          {images.map((image, index) => (
            <Card key={index} className="border-border">
              <CardContent className="p-3">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      value={image}
                      onChange={(e) => onImageChange(index, e.target.value)}
                      placeholder={`Image URL ${index + 1}`}
                    />
                  </div>
                  {images.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => onImageRemove(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {images.length < 10 && (
            <Button type="button" variant="outline" onClick={onImageAdd} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Image URL
            </Button>
          )}
        </div>
        {errors.images && <p className="text-destructive text-sm">{errors.images}</p>}
      </div>
    </div>
  );
}
