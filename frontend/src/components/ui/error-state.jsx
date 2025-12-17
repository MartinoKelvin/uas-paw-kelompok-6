import PropTypes from "prop-types";
import { AlertCircle, RefreshCw, WifiOff, ServerCrash, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ERROR_TYPES = {
  generic: {
    icon: AlertCircle,
    title: "Something went wrong",
    description: "An unexpected error occurred. Please try again.",
  },
  network: {
    icon: WifiOff,
    title: "Connection error",
    description: "Please check your internet connection and try again.",
  },
  server: {
    icon: ServerCrash,
    title: "Server error",
    description: "Our servers are having trouble. Please try again later.",
  },
  auth: {
    icon: ShieldAlert,
    title: "Authentication error",
    description: "Your session has expired. Please sign in again.",
  },
  notFound: {
    icon: AlertCircle,
    title: "Not found",
    description: "The requested resource could not be found.",
  },
};

/**
 * Inline error alert
 */
export function ErrorAlert({ type = "generic", message, className = "" }) {
  const config = ERROR_TYPES[type] || ERROR_TYPES.generic;
  const IconComponent = config.icon;

  return (
    <Alert variant="destructive" className={className}>
      <IconComponent className="h-4 w-4" />
      <AlertTitle>{config.title}</AlertTitle>
      <AlertDescription>{message || config.description}</AlertDescription>
    </Alert>
  );
}

/**
 * Full page error state with retry
 */
export function ErrorState({
  type = "generic",
  title,
  message,
  onRetry,
  retryLabel = "Try again",
  className = "",
}) {
  const config = ERROR_TYPES[type] || ERROR_TYPES.generic;
  const IconComponent = config.icon;

  return (
    <div className={`flex flex-col items-center justify-center py-12 text-center ${className}`}>
      <div className="bg-destructive/10 mb-4 rounded-full p-4">
        <IconComponent className="text-destructive h-8 w-8" />
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title || config.title}</h3>
      <p className="text-muted-foreground mb-6 max-w-sm text-sm">{message || config.description}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          {retryLabel}
        </Button>
      )}
    </div>
  );
}

/**
 * API error handler - converts error to user-friendly message
 */
export function getErrorMessage(error) {
  if (!error) return "An unexpected error occurred";

  // Network error
  if (!error.response) {
    return "Unable to connect to the server. Please check your internet connection.";
  }

  // HTTP errors
  const status = error.response?.status;
  const serverMessage = error.response?.data?.message || error.response?.data?.detail;

  switch (status) {
    case 400:
      return serverMessage || "Invalid request. Please check your input.";
    case 401:
      return "Your session has expired. Please sign in again.";
    case 403:
      return "You don't have permission to perform this action.";
    case 404:
      return serverMessage || "The requested resource was not found.";
    case 422:
      return serverMessage || "Invalid data provided. Please check your input.";
    case 429:
      return "Too many requests. Please wait a moment and try again.";
    case 500:
      return "Server error. Please try again later.";
    default:
      return serverMessage || "An unexpected error occurred. Please try again.";
  }
}

// PropTypes definitions
const errorTypes = ["generic", "network", "server", "auth", "notFound"];

ErrorAlert.propTypes = {
  type: PropTypes.oneOf(errorTypes),
  message: PropTypes.string,
  className: PropTypes.string,
};

ErrorState.propTypes = {
  type: PropTypes.oneOf(errorTypes),
  title: PropTypes.string,
  message: PropTypes.string,
  onRetry: PropTypes.func,
  retryLabel: PropTypes.string,
  className: PropTypes.string,
};
