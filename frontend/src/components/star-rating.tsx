import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
    rating: number;
    maxRating?: number;
    size?: number;
    interactive?: boolean;
    onRatingChange?: (rating: number) => void;
    className?: string;
}

export function StarRating({
    rating,
    maxRating = 5,
    size = 20,
    interactive = false,
    onRatingChange,
    className,
}: StarRatingProps) {
    const [hoveredRating, setHoveredRating] = useState(0);

    const displayRating = interactive && hoveredRating > 0 ? hoveredRating : rating;

    return (
        <div className={cn("flex items-center gap-1", className)}>
            {[...Array(maxRating)].map((_, index) => {
                const starValue = index + 1;
                const isFilled = starValue <= displayRating;

                return (
                    <Star
                        key={index}
                        className={cn(
                            "transition-colors",
                            isFilled ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
                            interactive && "cursor-pointer hover:scale-110"
                        )}
                        size={size}
                        onClick={interactive ? () => onRatingChange?.(starValue) : undefined}
                        onMouseEnter={interactive ? () => setHoveredRating(starValue) : undefined}
                        onMouseLeave={interactive ? () => setHoveredRating(0) : undefined}
                    />
                );
            })}
        </div>
    );
}
