import { Briefcase } from 'lucide-react';
import EmptyState from './EmptyState';

export interface EmptyStateCaseStudiesProps {
  region?: string;
}

const EmptyStateCaseStudies = ({ region }: EmptyStateCaseStudiesProps) => {
  const description = region
    ? `We haven't published any case studies for ${region} yet. Check back soon or explore case studies from other regions.`
    : "We're working on documenting our success stories. Check back soon to see how we've helped businesses grow across UK, UAE, and India.";

  return (
    <EmptyState
      icon={Briefcase}
      title="No Case Studies Available"
      description={description}
    />
  );
};

EmptyStateCaseStudies.displayName = 'EmptyStateCaseStudies';

export default EmptyStateCaseStudies;
