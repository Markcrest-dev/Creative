/**
 * useFormValidation Hook Tests
 * Tests form validation logic, error handling, and field state management
 */

import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFormValidation } from '../hooks/useFormValidation';

describe('useFormValidation', () => {
  it('initializes with empty errors and not submitting', () => {
    const { result } = renderHook(() => useFormValidation());

    expect(result.current.errors).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.touchedFields).toEqual({});
  });

  it('validates name field correctly', () => {
    const { result } = renderHook(() => useFormValidation());

    act(() => {
      result.current.handleFieldChange('name', '');
    });

    expect(result.current.fieldStates.name?.isValid).toBe(false);

    act(() => {
      result.current.handleFieldChange('name', 'John Doe');
    });

    expect(result.current.fieldStates.name?.isValid).toBe(true);
  });

  it('validates email field correctly', () => {
    const { result } = renderHook(() => useFormValidation());

    act(() => {
      result.current.handleFieldChange('email', 'invalid-email');
    });

    expect(result.current.fieldStates.email?.isValid).toBe(false);

    act(() => {
      result.current.handleFieldChange('email', 'test@example.com');
    });

    expect(result.current.fieldStates.email?.isValid).toBe(true);
  });

  it('marks field as touched on blur', () => {
    const { result } = renderHook(() => useFormValidation());

    expect(result.current.touchedFields.name).toBeUndefined();

    act(() => {
      result.current.handleFieldChange('name', 'John');
      result.current.handleFieldBlur('name');
    });

    expect(result.current.touchedFields.name).toBe(true);
  });

  it('shows errors only for touched fields', () => {
    const { result } = renderHook(() => useFormValidation());

    // Field is invalid but not touched
    act(() => {
      result.current.handleFieldChange('name', '');
    });

    expect(result.current.errors.name).toBeUndefined();

    // Mark field as touched
    act(() => {
      result.current.handleFieldBlur('name');
    });

    expect(result.current.errors.name).toBeDefined();
  });

  it('validates email format', () => {
    const { result } = renderHook(() => useFormValidation());

    const invalidEmails = ['test', 'test@', '@test.com', 'test@test'];
    const validEmails = ['test@test.com', 'user@example.org', 'name@domain.co.uk'];

    invalidEmails.forEach((email) => {
      act(() => {
        result.current.handleFieldChange('email', email);
      });
      expect(result.current.fieldStates.email?.isValid).toBe(false);
    });

    validEmails.forEach((email) => {
      act(() => {
        result.current.handleFieldChange('email', email);
      });
      expect(result.current.fieldStates.email?.isValid).toBe(true);
    });
  });

  it('validates name contains only letters and spaces', () => {
    const { result } = renderHook(() => useFormValidation());

    act(() => {
      result.current.handleFieldChange('name', 'John123');
    });
    expect(result.current.fieldStates.name?.isValid).toBe(false);

    act(() => {
      result.current.handleFieldChange('name', 'John Doe');
    });
    expect(result.current.fieldStates.name?.isValid).toBe(true);
  });

  it('validates subject length', () => {
    const { result } = renderHook(() => useFormValidation());

    // Too short
    act(() => {
      result.current.handleFieldChange('subject', 'Hi');
    });
    expect(result.current.fieldStates.subject?.isValid).toBe(false);

    // Valid length
    act(() => {
      result.current.handleFieldChange('subject', 'Hello there');
    });
    expect(result.current.fieldStates.subject?.isValid).toBe(true);

    // Too long (>100 chars)
    act(() => {
      result.current.handleFieldChange('subject', 'a'.repeat(101));
    });
    expect(result.current.fieldStates.subject?.isValid).toBe(false);
  });

  it('validates message length', () => {
    const { result } = renderHook(() => useFormValidation());

    // Too short (<10 chars)
    act(() => {
      result.current.handleFieldChange('message', 'Short');
    });
    expect(result.current.fieldStates.message?.isValid).toBe(false);

    // Valid length
    act(() => {
      result.current.handleFieldChange('message', 'This is a valid message with enough characters');
    });
    expect(result.current.fieldStates.message?.isValid).toBe(true);

    // Too long (>1000 chars)
    act(() => {
      result.current.handleFieldChange('message', 'a'.repeat(1001));
    });
    expect(result.current.fieldStates.message?.isValid).toBe(false);
  });

  it('handles form submission with valid data', async () => {
    const { result } = renderHook(() => useFormValidation());
    const mockOnSubmit = vi.fn().mockResolvedValue(undefined);

    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'This is a test message with enough characters',
    };

    let success = false;
    await act(async () => {
      success = await result.current.handleSubmit(formData, mockOnSubmit);
    });

    expect(success).toBe(true);
    expect(mockOnSubmit).toHaveBeenCalledWith(formData);
  });

  it('handles form submission with invalid data', async () => {
    const { result } = renderHook(() => useFormValidation());
    const mockOnSubmit = vi.fn();

    const formData = {
      name: '', // Invalid - empty
      email: 'invalid-email', // Invalid format
      subject: 'Hi', // Too short
      message: 'Short', // Too short
    };

    let success = false;
    await act(async () => {
      success = await result.current.handleSubmit(formData, mockOnSubmit);
    });

    expect(success).toBe(false);
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('marks all fields as touched on submit', async () => {
    const { result } = renderHook(() => useFormValidation());
    const mockOnSubmit = vi.fn().mockResolvedValue(undefined);

    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'This is a valid test message',
    };

    await act(async () => {
      await result.current.handleSubmit(formData, mockOnSubmit);
    });

    expect(result.current.touchedFields.name).toBe(true);
    expect(result.current.touchedFields.email).toBe(true);
    expect(result.current.touchedFields.subject).toBe(true);
    expect(result.current.touchedFields.message).toBe(true);
  });

  it('sets isSubmitting to true during submission', async () => {
    const { result } = renderHook(() => useFormValidation());

    let resolveSubmit: () => void;
    const submitPromise = new Promise<void>((resolve) => {
      resolveSubmit = resolve;
    });

    const mockOnSubmit = vi.fn().mockReturnValue(submitPromise);

    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'This is a valid test message',
    };

    let submitResult: Promise<boolean>;

    // Start submission
    act(() => {
      submitResult = result.current.handleSubmit(formData, mockOnSubmit);
    });

    // Check if isSubmitting is true while promise is pending
    expect(result.current.isSubmitting).toBe(true);

    // Resolve the promise to complete submission
    await act(async () => {
      if (resolveSubmit) resolveSubmit();
      await submitResult;
    });

    expect(result.current.isSubmitting).toBe(false);
  });
});
