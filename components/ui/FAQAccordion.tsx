'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export default function FAQAccordion({ items, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleItem(index);
    }
  };

  return (
    <div className={cn('max-w-4xl mx-auto space-y-4', className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const itemId = `faq-item-${index}`;
        const contentId = `faq-content-${index}`;

        return (
          <div
            key={index}
            className="bg-white dark:bg-deep-obsidian border-2 border-slate-200 dark:border-warm-sand/30 rounded-lg overflow-hidden transition-all duration-300 hover:border-warm-sand/60"
          >
            <button
              id={itemId}
              onClick={() => toggleItem(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-expanded={isOpen}
              aria-controls={contentId}
              className="w-full flex items-center justify-between gap-4 p-6 text-left focus:outline-none focus:ring-2 focus:ring-warm-sand focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-deep-obsidian transition-all min-h-[64px]"
            >
              <h3 className="text-lg md:text-xl font-unbounded font-bold text-gray-900 dark:text-warm-sand flex-1 pr-4">
                {item.question}
              </h3>
              <div
                className={cn(
                  'flex-shrink-0 w-8 h-8 rounded-full bg-warm-sand/20 flex items-center justify-center transition-all duration-300',
                  isOpen && 'bg-warm-sand rotate-180'
                )}
                aria-hidden="true"
              >
                {isOpen ? (
                  <Minus size={20} className={cn('text-warm-sand transition-colors', isOpen && 'text-deep-obsidian')} />
                ) : (
                  <Plus size={20} className="text-warm-sand" />
                )}
              </div>
            </button>

            <div
              id={contentId}
              role="region"
              aria-labelledby={itemId}
              className={cn(
                'overflow-hidden transition-all duration-300 ease-in-out',
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <div className="px-6 pb-6 pt-2">
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-200 leading-relaxed" style={{ lineHeight: '1.8' }}>
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
