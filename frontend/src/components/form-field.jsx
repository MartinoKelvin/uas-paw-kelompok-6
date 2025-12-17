import PropTypes from "prop-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Reusable Form Field wrapper with label and error handling
 * Reduces repetition in form components
 */
export function FormField({
  id,
  label,
  error,
  required = false,
  description,
  children,
  className = "",
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <Label htmlFor={id}>
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      {children}
      {description && <p className="text-muted-foreground text-sm">{description}</p>}
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
}

/**
 * Text Input Field
 */
export function TextField({
  id,
  label,
  value,
  onChange,
  error,
  required,
  placeholder,
  type = "text",
  description,
  disabled,
  ...props
}) {
  return (
    <FormField id={id} label={label} error={error} required={required} description={description}>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        {...props}
      />
    </FormField>
  );
}

/**
 * Number Input Field
 */
export function NumberField({
  id,
  label,
  value,
  onChange,
  error,
  required,
  placeholder,
  min,
  max,
  description,
  disabled,
  ...props
}) {
  return (
    <FormField id={id} label={label} error={error} required={required} description={description}>
      <Input
        id={id}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        disabled={disabled}
        {...props}
      />
    </FormField>
  );
}

/**
 * Textarea Field
 */
export function TextareaField({
  id,
  label,
  value,
  onChange,
  error,
  required,
  placeholder,
  rows = 4,
  description,
  disabled,
  ...props
}) {
  return (
    <FormField id={id} label={label} error={error} required={required} description={description}>
      <Textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        {...props}
      />
    </FormField>
  );
}

/**
 * Select Field
 */
export function SelectField({
  id,
  label,
  value,
  onChange,
  options = [],
  error,
  required,
  placeholder = "Select an option",
  description,
  disabled,
  valueKey = "value",
  labelKey = "label",
}) {
  return (
    <FormField id={id} label={label} error={error} required={required} description={description}>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={typeof option === "object" ? option[valueKey] : option}
              value={typeof option === "object" ? option[valueKey] : option}
            >
              {typeof option === "object" ? option[labelKey] : option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>
  );
}

/**
 * Phone Input Field with formatting hint
 */
export function PhoneField({ id, label, value, onChange, error, required, disabled }) {
  return (
    <FormField
      id={id}
      label={label}
      error={error}
      required={required}
      description="Format: +628xxx or 08xxx for WhatsApp"
    >
      <Input
        id={id}
        type="tel"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., +628123456789"
        disabled={disabled}
      />
    </FormField>
  );
}

// PropTypes definitions
FormField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  description: PropTypes.string,
  disabled: PropTypes.bool,
};

NumberField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  description: PropTypes.string,
  disabled: PropTypes.bool,
};

TextareaField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  description: PropTypes.string,
  disabled: PropTypes.bool,
};

SelectField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      }),
    ])
  ),
  error: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
};

PhoneField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
};
