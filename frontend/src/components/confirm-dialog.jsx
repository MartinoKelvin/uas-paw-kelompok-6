import PropTypes from "prop-types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { InlineLoader } from "@/components/ui/loading-state";

/**
 * Reusable Confirmation Dialog
 * Use for delete confirmations, destructive actions, etc.
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  isLoading = false,
  variant = "destructive",
}) {
  const handleConfirm = async () => {
    await onConfirm?.();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isLoading}
            className={
              variant === "destructive"
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : ""
            }
          >
            {isLoading ? (
              <>
                <InlineLoader size="sm" className="mr-2" />
                Processing...
              </>
            ) : (
              confirmLabel
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

/**
 * Delete Confirmation Dialog - preset for delete actions
 */
export function DeleteDialog({ open, onOpenChange, itemName = "item", onConfirm, isLoading }) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={`Delete ${itemName}?`}
      description={`Are you sure you want to delete this ${itemName}? This action cannot be undone.`}
      confirmLabel="Delete"
      onConfirm={onConfirm}
      isLoading={isLoading}
      variant="destructive"
    />
  );
}

/**
 * Cancel Booking Dialog
 */
export function CancelBookingDialog({ open, onOpenChange, onConfirm, isLoading }) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Cancel Booking?"
      description="Are you sure you want to cancel this booking? You may lose your reservation."
      confirmLabel="Cancel Booking"
      onConfirm={onConfirm}
      isLoading={isLoading}
      variant="destructive"
    />
  );
}

// PropTypes definitions
ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  onConfirm: PropTypes.func,
  isLoading: PropTypes.bool,
  variant: PropTypes.oneOf(["default", "destructive"]),
};

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  itemName: PropTypes.string,
  onConfirm: PropTypes.func,
  isLoading: PropTypes.bool,
};

CancelBookingDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  isLoading: PropTypes.bool,
};
