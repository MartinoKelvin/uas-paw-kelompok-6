import PropTypes from "prop-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Reusable Stats Card component for dashboards
 */
export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendLabel,
  className = "",
}) {
  const trendColor =
    trend > 0 ? "text-green-600" : trend < 0 ? "text-red-600" : "text-muted-foreground";

  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="text-muted-foreground h-4 w-4" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trendLabel) && (
          <p className="text-muted-foreground text-xs">
            {trend !== undefined && (
              <span className={cn("mr-1", trendColor)}>
                {trend > 0 ? "↑" : trend < 0 ? "↓" : "→"} {Math.abs(trend)}%
              </span>
            )}
            {trendLabel || description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Stats Grid - wraps multiple stats cards
 */
export function StatsGrid({ children, columns = 4, className = "" }) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-4", gridCols[columns] || gridCols[4], className)}>{children}</div>
  );
}

// PropTypes definitions
StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  description: PropTypes.string,
  icon: PropTypes.elementType,
  trend: PropTypes.number,
  trendLabel: PropTypes.string,
  className: PropTypes.string,
};

StatsGrid.propTypes = {
  children: PropTypes.node.isRequired,
  columns: PropTypes.oneOf([2, 3, 4]),
  className: PropTypes.string,
};
