import PropTypes from "prop-types";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

/**
 * Reusable Page Header component
 * Includes back button, title, description, and optional actions
 */
export function PageHeader({
  title,
  description,
  backTo,
  backLabel = "Back",
  actions,
  className = "",
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {backTo !== undefined && (
        <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Button>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
          {description && <p className="text-muted-foreground mt-1">{description}</p>}
        </div>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
    </div>
  );
}

/**
 * Section Header for inside pages
 */
export function SectionHeader({ title, description, actions, className = "" }) {
  return (
    <div
      className={`flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        {description && <p className="text-muted-foreground text-sm">{description}</p>}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}

// PropTypes definitions
PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  backTo: PropTypes.string,
  backLabel: PropTypes.string,
  actions: PropTypes.node,
  className: PropTypes.string,
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  actions: PropTypes.node,
  className: PropTypes.string,
};
