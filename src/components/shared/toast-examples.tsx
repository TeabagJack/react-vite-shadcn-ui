import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

/**
 * Toast notification examples component
 * Demonstrates all toast types and features
 */
export function ToastExamples() {
  const toast = useToast();

  const handlePromiseToast = () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        // Randomly succeed or fail for demonstration
        Math.random() > 0.5 ? resolve('Success!') : reject(new Error('Failed'));
      }, 2000);
    });

    toast.promise(promise, {
      loading: 'Creating event...',
      success: 'Event created successfully!',
      error: 'Failed to create event',
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Toast Notification Examples</h2>
      <p className="text-muted-foreground mb-6">
        Click buttons below to test different toast notification types
      </p>

      <div className="flex flex-col gap-3">
        <Button
          onClick={() => toast.success('Event created!', 'Your event is now live and visible to attendees')}
          variant="default"
          className="justify-start"
        >
          Show Success Toast
        </Button>

        <Button
          onClick={() => toast.error('Failed to save event', 'Please check your internet connection and try again')}
          variant="destructive"
          className="justify-start"
        >
          Show Error Toast
        </Button>

        <Button
          onClick={() => toast.warning('Draft saved', 'Complete all required fields to publish your event')}
          variant="outline"
          className="justify-start"
        >
          Show Warning Toast
        </Button>

        <Button
          onClick={() => toast.info('New feature available', 'Check out the new advanced search filters')}
          variant="secondary"
          className="justify-start"
        >
          Show Info Toast
        </Button>

        <Button
          onClick={handlePromiseToast}
          variant="outline"
          className="justify-start"
        >
          Show Promise Toast (Random Success/Fail)
        </Button>

        <Button
          onClick={() => {
            toast.show({
              type: 'success',
              title: 'Quick notification',
              description: 'This will disappear in 1 second',
              duration: 1000
            });
          }}
          variant="ghost"
          className="justify-start"
        >
          Short Duration Toast (1s)
        </Button>

        <Button
          onClick={() => {
            toast.show({
              type: 'error',
              title: 'Important error',
              description: 'This stays for 10 seconds',
              duration: 10000
            });
          }}
          variant="ghost"
          className="justify-start"
        >
          Long Duration Toast (10s)
        </Button>
      </div>

      <div className="mt-6 p-4 bg-muted rounded-lg">
        <h3 className="font-semibold mb-2">Usage:</h3>
        <pre className="text-sm overflow-x-auto">
          {`const toast = useToast();

// Simple notifications
toast.success('Title', 'Description');
toast.error('Title', 'Description');
toast.warning('Title', 'Description');
toast.info('Title', 'Description');

// Promise notifications
toast.promise(fetchData(), {
  loading: 'Loading...',
  success: 'Success!',
  error: 'Failed!'
});`}
        </pre>
      </div>
    </Card>
  );
}
