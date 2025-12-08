import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StarRating } from "@/components/star-rating";
import { getInitials, formatDate } from "@/lib/formatters";
import type { Review } from "@/types";

interface ReviewCardProps {
    review: Review;
    touristName?: string;
}

export function ReviewCard({ review, touristName = "Anonymous" }: ReviewCardProps) {
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
                                <p className="font-semibold text-foreground">{touristName}</p>
                                <p className="text-sm text-muted-foreground">
                                    {formatDate(review.createdAt)}
                                </p>
                            </div>
                            <StarRating rating={review.rating} size={16} />
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {review.comment}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
