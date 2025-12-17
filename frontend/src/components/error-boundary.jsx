import PropTypes from "prop-types";
import { Component } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, RefreshCw } from "lucide-react";
import { logger } from "@/lib/logger";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    logger.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset() {
    this.setState({ hasError: false, error: undefined });
    window.location.href = "/";
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center p-4">
          <Card className="border-destructive max-w-md">
            <CardContent className="space-y-4 pt-6 text-center">
              <div className="flex justify-center">
                <AlertCircle className="text-destructive h-12 w-12" />
              </div>
              <div className="space-y-2">
                <h2 className="text-foreground text-2xl font-bold">Something Went Wrong</h2>
                <p className="text-muted-foreground">
                  We encountered an unexpected error. Please try refreshing the page.
                </p>
                {this.state.error && (
                  <details className="mt-4 text-left">
                    <summary className="text-muted-foreground hover:text-foreground cursor-pointer text-sm">
                      Error details
                    </summary>
                    <pre className="bg-muted mt-2 overflow-auto rounded-md p-4 text-xs">
                      {this.state.error.message}
                    </pre>
                  </details>
                )}
              </div>
              <Button onClick={this.handleReset} className="w-full" variant="default">
                <RefreshCw className="mr-2 h-4 w-4" />
                Return to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
