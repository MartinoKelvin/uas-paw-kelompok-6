import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

export function useFormValidation(schema) {
  const [errors, setErrors] = useState({});

  const validate = (data) => {
    const result = schema.safeParse(data);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0]] = issue.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("Please fix the validation errors");
      return false;
    }

    setErrors({});
    return true;
  };

  const clearErrors = () => setErrors({});
  const setFieldError = (field, message) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  return { errors, validate, clearErrors, setFieldError };
}
