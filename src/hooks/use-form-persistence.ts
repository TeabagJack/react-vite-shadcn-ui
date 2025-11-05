import { useEffect } from 'react';
import { UseFormReturn, FieldValues } from 'react-hook-form';

interface UseFormPersistenceOptions<T extends FieldValues> {
  key: string;
  form: UseFormReturn<T>;
  enabled?: boolean;
}

/**
 * Hook for persisting form data to localStorage
 * Automatically saves form data on changes and restores on mount
 *
 * @param options - Configuration options for form persistence
 * @returns Utilities for managing persisted form data
 *
 * @example
 * const form = useForm();
 * const { clearPersistedData } = useFormPersistence({
 *   key: 'event-creation',
 *   form,
 *   enabled: true
 * });
 *
 * // Clear saved data when form is submitted
 * const onSubmit = (data) => {
 *   submitForm(data);
 *   clearPersistedData();
 * };
 */
export function useFormPersistence<T extends FieldValues>({
  key,
  form,
  enabled = true,
}: UseFormPersistenceOptions<T>) {
  const storageKey = `form-${key}`;

  // Load from localStorage on mount
  useEffect(() => {
    if (!enabled) return;

    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        form.reset(data);
      } catch (err) {
        console.error('Failed to load form data:', err);
      }
    }
  }, [storageKey, enabled, form]);

  // Save to localStorage on change
  useEffect(() => {
    if (!enabled) return;

    const subscription = form.watch((data) => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(data));
      } catch (err) {
        console.error('Failed to save form data:', err);
      }
    });

    return () => subscription.unsubscribe();
  }, [form, storageKey, enabled]);

  const clearPersistedData = () => {
    localStorage.removeItem(storageKey);
  };

  return { clearPersistedData };
}
