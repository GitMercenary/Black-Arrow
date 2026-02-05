import { Inbox } from 'lucide-react';
import EmptyState from './EmptyState';

export interface EmptyStateLeadsProps {
  onRefresh?: () => void;
}

const EmptyStateLeads = ({ onRefresh }: EmptyStateLeadsProps) => {
  return (
    <EmptyState
      icon={Inbox}
      title="No Leads Yet"
      description="New leads from the contact form will appear here. Check back soon or share your contact page to start receiving inquiries."
      action={
        onRefresh
          ? {
              label: 'Refresh',
              onClick: onRefresh,
              variant: 'secondary',
            }
          : undefined
      }
    />
  );
};

EmptyStateLeads.displayName = 'EmptyStateLeads';

export default EmptyStateLeads;
