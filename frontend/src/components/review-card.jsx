import PropTypes from "prop-types";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StarRating } from "@/components/star-rating";
import { getInitials, formatDate } from "@/lib/formatters";

export function ReviewCard({ review, touristName = "Anonymous" }) {
  return (
    <Card className="border-border">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary/10 text-primary">
              {getInitials(touristName)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-semibold">{touristName}</p>
                <p className="text-muted-foreground text-sm">{formatDate(review.createdAt)}</p>
              </div>
              <StarRating rating={review.rating} size={16} />
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed">{review.comment}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

ReviewCard.propTypes = {
  review: PropTypes.shape({
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string,
    createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  }).isRequired,
  touristName: PropTypes.string,
};
