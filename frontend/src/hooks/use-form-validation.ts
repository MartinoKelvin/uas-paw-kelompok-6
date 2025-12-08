import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

export function useFormValidation<T extends z.ZodType>(schema: T) {
  type FormData = z.infer<T>;
  type ErrorType = Partial<Record<keyof FormData, string>>;

  const [errors, setErrors] = useState<ErrorType>({});

  const validate = (data: FormData): boolean => {
    const result = schema.safeParse(data);

    if (!result.success) {
      const fieldErrors: ErrorType = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof FormData] = issue.message;
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
  const setFieldError = (field: keyof FormData, message: string) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  return { errors, validate, clearErrors, setFieldError };
}
