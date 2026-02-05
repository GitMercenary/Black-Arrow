import { BookOpen } from 'lucide-react';
import EmptyState from './EmptyState';

export interface EmptyStateBlogProps {
  isAdmin?: boolean;
  onCreatePost?: () => void;
}

const EmptyStateBlog = ({ isAdmin = false, onCreatePost }: EmptyStateBlogProps) => {
  return (
    <EmptyState
      icon={BookOpen}
      title="No Posts Yet"
      description={
        isAdmin
          ? "You haven't published any blog posts yet. Create your first post to share insights and expertise with your audience."
          : "We haven't published any blog posts yet. Check back soon for insights on e-commerce, performance marketing, and automation."
      }
      action={
        isAdmin && onCreatePost
          ? {
              label: 'Create First Post',
              onClick: onCreatePost,
              variant: 'primary',
            }
          : undefined
      }
    />
  );
};

EmptyStateBlog.displayName = 'EmptyStateBlog';

export default EmptyStateBlog;
