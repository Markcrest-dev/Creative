import { useState, useCallback } from 'react';
import { sanitizeFormData } from '../utils/sanitize';

// Define types
interface ValidationRule {
  rule: (value: string) => boolean;
  message: string;
}

interface FieldState {
  currentValue: string;
  isValid: boolean;
  message: string;
}

// Advanced validation rules
const validationRules: Record<string, ValidationRule[]> = {
  name: [
    { rule: (value: string) => !!value.trim(), message: 'Name is required' },
    { rule: (value: string) => value.length >= 2, message: 'Name must be at least 2 characters' },
    {
      rule: (value: string) => /^[a-zA-Z\s]+$/.test(value),
      message: 'Name can only contain letters and spaces',
    },
  ],
  email: [
    { rule: (value: string) => !!value.trim(), message: 'Email is required' },
    {
      rule: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Please enter a valid email',
    },
    { rule: (value: string) => value.length <= 254, message: 'Email is too long' },
  ],
  subject: [
    { rule: (value: string) => !!value.trim(), message: 'Subject is required' },
    {
      rule: (value: string) => value.length >= 5,
      message: 'Subject must be at least 5 characters',
    },
    {
      rule: (value: string) => value.length <= 100,
      message: 'Subject must be less than 100 characters',
    },
  ],
  message: [
    { rule: (value: string) => !!value.trim(), message: 'Message is required' },
    {
      rule: (value: string) => value.length >= 10,
      message: 'Message must be at least 10 characters',
    },
    {
      rule: (value: string) => value.length <= 1000,
      message: 'Message must be less than 1000 characters',
    },
  ],
};

// Custom hook for advanced form validation
export const useFormValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [fieldStates, setFieldStates] = useState<Record<string, FieldState>>({});

  // Validation rules
  const validateField = useCallback((name: string, value: string) => {
    const rules = validationRules[name];
    if (!rules) return '';

    for (const { rule, message } of rules) {
      if (!rule(value)) return message;
    }
    return '';
  }, []);

  // Real-time validation for improved UX
  const getRealTimeValidation = useCallback(
    (name: string, value: string) => {
      const error = validateField(name, value);
      return {
        isValid: !error,
        message: error,
      };
    },
    [validateField]
  );



  // Validate entire form
  const validateForm = useCallback(
    (formData: Record<string, string>) => {
      const newErrors: Record<string, string> = {};

      Object.keys(formData).forEach((key) => {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      });

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [validateField]
  );

  // Handle field change with validation
  const handleFieldChange = useCallback(
    (name: string, value: string) => {
      // Update field states with real-time validation
      setFieldStates((prev) => ({
        ...prev,
        [name]: {
          currentValue: value,
          ...getRealTimeValidation(name, value),
        },
      }));

      // Only show errors for touched fields
      if (touchedFields[name]) {
        const error = validateField(name, value);
        setErrors((prev) => ({
          ...prev,
          [name]: error,
        }));
      }
    },
    [validateField, touchedFields, getRealTimeValidation]
  );

  // Handle field blur to mark as touched
  const handleFieldBlur = useCallback(
    (name: string) => {
      setTouchedFields((prev) => ({ ...prev, [name]: true }));

      // Validate field on blur
      const currentValue = fieldStates[name]?.currentValue || '';
      const error = validateField(name, currentValue);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    },
    [validateField, fieldStates]
  );

  // Handle form submission
  const handleSubmit = useCallback(
    async (
      formData: Record<string, string>,
      onSubmit: (data: Record<string, string>) => Promise<void>
    ) => {
      // Sanitize data first
      const sanitizedData = sanitizeFormData(formData);

      // Mark all fields as touched
      const allFields = Object.keys(sanitizedData);
      const newTouchedFields = allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {});
      setTouchedFields(newTouchedFields);

      if (!validateForm(sanitizedData)) {
        return false;
      }

      setIsSubmitting(true);
      try {
        await onSubmit(sanitizedData);
        return true;
      } catch (error) {
        console.error('Form submission error:', error);
        setErrors({ submit: 'An error occurred. Please try again.' });
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [validateForm]
  );

  return {
    errors,
    isSubmitting,
    touchedFields,
    fieldStates,
    handleFieldChange,
    handleFieldBlur,
    handleSubmit,
    validateForm,
    getRealTimeValidation,
  };
};
