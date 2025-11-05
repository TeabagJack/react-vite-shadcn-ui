import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tag, Calendar } from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';

export default function CategoryScreen() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  // Mock category data
  const categories = {
    sports: 'Sports & Fitness',
    music: 'Music & Entertainment',
    tech: 'Technology',
    food: 'Food & Dining',
    art: 'Arts & Culture',
  };

  const categoryName = categories[categoryId as keyof typeof categories] || 'Category';

  return (
    <motion.div
      className="h-full flex flex-col bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <DashboardHeader
        title={categoryName}
        showBackButton={true}
        onBackClick={() => navigate(-1)}
      />

      <div className="flex-1 overflow-y-auto px-6 py-4 pb-24 space-y-6">
        {/* Category Header */}
        <div className="space-y-4">
          <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
            <Tag className="w-12 h-12 text-muted-foreground" />
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-2">{categoryName}</h1>
            <p className="text-muted-foreground">
              Browse events in the {categoryName.toLowerCase()} category.
            </p>
          </div>
        </div>

        {/* Events List Placeholder */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Upcoming Events</h2>

          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-lg p-4 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">Event Title {i}</h3>
                  <p className="text-sm text-muted-foreground">
                    Event description placeholder
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Date TBD</span>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-sm text-muted-foreground">
            This is a placeholder for the category screen. Full implementation with real event data coming in Phase 2.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
