import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
}

export default function Card({ className, children, hover = true, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-deep-obsidian border-2 border-slate-200 dark:border-warm-sand/20 rounded-lg p-6 sm:p-8',
        hover && 'hover:border-warm-sand hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer',
        'focus-within:outline-none focus-within:ring-2 focus-within:ring-warm-sand focus-within:ring-offset-2 focus-within:ring-offset-deep-obsidian',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface BentoCardProps extends HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description: string;
  hover?: boolean;
}

export function BentoCard({ icon, title, description, hover = true, className, ...props }: BentoCardProps) {
  return (
    <Card hover={hover} className={className} {...props} tabIndex={0} role="button">
      {icon && (
        <div className="text-warm-sand mb-3 sm:mb-4" aria-hidden="true">
          {icon}
        </div>
      )}
      <h3 className="font-unbounded text-xl sm:text-2xl mb-3 sm:mb-4 text-gray-900 dark:text-cloud-dancer">{title}</h3>
      <p className="font-hanken text-gray-700 dark:text-gray-200 leading-relaxed text-base" style={{lineHeight: '1.75'}}>{description}</p>
    </Card>
  );
}
