import { toast as sonnerToast } from 'sonner';
import type { ToastMessage } from '@/types';

/**
 * Custom toast hook wrapping sonner for consistent toast notifications
 * @returns Toast methods for displaying notifications
 */
export function useToast() {
  /**
   * Display a toast notification with full configuration
   * @param message - Toast message configuration
   */
  const showToast = (message: Omit<ToastMessage, 'id'>) => {
    const { type, title, description, duration = 3000 } = message;

    switch (type) {
      case 'success':
        sonnerToast.success(title, {
          description,
          duration,
        });
        break;
      case 'error':
        sonnerToast.error(title, {
          description,
          duration: duration || 5000, // Errors stay longer
        });
        break;
      case 'warning':
        sonnerToast.warning(title, {
          description,
          duration,
        });
        break;
      case 'info':
      default:
        sonnerToast.info(title, {
          description,
          duration,
        });
        break;
    }
  };

  /**
   * Display a success toast
   * @param title - Main message
   * @param description - Optional description
   */
  const success = (title: string, description?: string) => {
    showToast({ type: 'success', title, description });
  };

  /**
   * Display an error toast
   * @param title - Error message
   * @param description - Optional error details
   */
  const error = (title: string, description?: string) => {
    showToast({ type: 'error', title, description });
  };

  /**
   * Display a warning toast
   * @param title - Warning message
   * @param description - Optional warning details
   */
  const warning = (title: string, description?: string) => {
    showToast({ type: 'warning', title, description });
  };

  /**
   * Display an info toast
   * @param title - Info message
   * @param description - Optional info details
   */
  const info = (title: string, description?: string) => {
    showToast({ type: 'info', title, description });
  };

  /**
   * Display a promise toast that updates based on promise state
   * @param promise - Promise to track
   * @param messages - Loading, success, and error messages
   * @returns The original promise
   */
  const promise = <T,>(
    promiseToast: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    return sonnerToast.promise(promiseToast, messages);
  };

  return {
    show: showToast,
    success,
    error,
    warning,
    info,
    promise,
  };
}
