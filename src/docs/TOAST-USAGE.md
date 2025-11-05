# Toast Notification System

## Overview
The toast notification system uses [sonner](https://sonner.emilkowal.ski/) for accessible, beautiful toast notifications.

## Installation
Already installed via shadcn CLI:
```bash
npx shadcn@latest add sonner --yes
```

## Basic Usage

### Import the hook
```typescript
import { useToast } from '@/hooks/use-toast';
```

### Simple notifications
```typescript
const toast = useToast();

// Success
toast.success('Event created!', 'Your event is now live');

// Error
toast.error('Failed to save', 'Please try again');

// Warning
toast.warning('Draft saved', 'Complete all fields to publish');

// Info
toast.info('New feature', 'Check out search filters');
```

### Custom duration
```typescript
toast.show({
  type: 'success',
  title: 'Quick message',
  description: 'This will disappear in 1 second',
  duration: 1000
});
```

### Promise-based toasts
```typescript
const promise = saveEvent(eventData);

toast.promise(promise, {
  loading: 'Saving event...',
  success: 'Event saved successfully!',
  error: 'Failed to save event'
});
```

## Configuration

### Global settings (in App.tsx)
```tsx
<Toaster
  position="top-center"  // Position on screen
  richColors            // Enhanced colors
  closeButton          // Show close button
/>
```

### Available positions
- `top-left`
- `top-center` (default)
- `top-right`
- `bottom-left`
- `bottom-center`
- `bottom-right`

## Features

✅ **Accessible**: Full ARIA support, keyboard navigation
✅ **Stackable**: Multiple toasts displayed in order
✅ **Dismissible**: Click to close or auto-dismiss
✅ **Theme-aware**: Adapts to light/dark mode
✅ **Promise support**: Show loading states
✅ **Rich colors**: Enhanced visual feedback
✅ **Custom icons**: Lucide icons for each type
✅ **TypeScript**: Full type safety

## Types

```typescript
interface ToastMessage {
  id?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  duration?: number;
}
```

## Examples

See `/src/components/shared/toast-examples.tsx` for interactive examples.

## Default Durations
- Success: 3000ms
- Error: 5000ms (longer for important errors)
- Warning: 3000ms
- Info: 3000ms
- Custom: Configurable via `duration` parameter

## Best Practices

1. **Keep titles short**: 2-4 words max
2. **Provide context**: Use descriptions for details
3. **Match severity**: Use appropriate toast types
4. **Avoid spam**: Don't show too many toasts at once
5. **Error handling**: Always show errors with actionable messages
6. **Success feedback**: Confirm important actions
7. **Loading states**: Use promise toasts for async operations

## Integration Examples

### Form submission
```typescript
const handleSubmit = async (data: FormData) => {
  const promise = api.createEvent(data);

  toast.promise(promise, {
    loading: 'Creating event...',
    success: 'Event created successfully!',
    error: 'Failed to create event'
  });

  await promise;
};
```

### Error boundaries
```typescript
try {
  await riskyOperation();
  toast.success('Operation completed');
} catch (error) {
  toast.error(
    'Operation failed',
    error.message || 'Please try again'
  );
}
```

### Real-time updates
```typescript
websocket.on('notification', (event) => {
  toast.info(event.title, event.message);
});
```

## Troubleshooting

### Toasts not appearing
- Ensure `<Toaster />` is in your App.tsx
- Check that component using `useToast()` is inside React tree

### Styling issues
- Verify Tailwind CSS is configured
- Check theme provider is wrapping the app
- Ensure sonner CSS is imported

### TypeScript errors
- Verify `ToastMessage` type is exported from `/src/types`
- Check sonner is installed: `npm list sonner`

## Resources
- [Sonner Documentation](https://sonner.emilkowal.ski/)
- [shadcn/ui Toast](https://ui.shadcn.com/docs/components/sonner)
- [Example Component](/src/components/shared/toast-examples.tsx)
