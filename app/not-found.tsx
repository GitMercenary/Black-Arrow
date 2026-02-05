import Link from 'next/link';
import { FileQuestion } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-deep-obsidian flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <FileQuestion size={80} className="text-warm-sand/30 mx-auto mb-6" strokeWidth={1.5} />

        <h1 className="text-8xl font-unbounded font-bold text-warm-sand mb-4">404</h1>

        <h2 className="text-3xl font-unbounded font-bold text-cloud-dancer mb-4">
          Page Not Found
        </h2>

        <p className="text-cloud-dancer/60 font-hanken text-lg mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="primary">
              Back to Home
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="secondary">
              Contact Us
            </Button>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-ui/30">
          <p className="text-cloud-dancer/40 text-sm font-hanken">
            Lost? We'll help you find your way. Drop us a message.
          </p>
        </div>
      </div>
    </div>
  );
}
