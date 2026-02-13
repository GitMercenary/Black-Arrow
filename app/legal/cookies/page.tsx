import Section from '@/components/ui/Section';
import FadeIn from '@/components/animations/FadeIn';

export const metadata = {
  title: 'Cookie Policy | Black Arrow Technologies',
  description: 'Learn about how Black Arrow Technologies uses cookies on our website.',
};

export default function CookiePolicyPage() {
  return (
    <main>
      <Section className="pt-40 pb-12">
        <div className="max-w-3xl mx-auto">
          <FadeIn direction="up" duration={0.6}>
            <h1 className="text-4xl md:text-5xl font-unbounded font-bold mb-6">
              Cookie Policy
            </h1>
          </FadeIn>

          <FadeIn direction="up" duration={0.6} delay={0.1}>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg text-gray-600 dark:text-cloud-dancer/80 mb-8">
                Last updated: February 2026
              </p>

              <h2 className="text-2xl font-unbounded font-bold mt-8 mb-4">What Are Cookies</h2>
              <p className="text-gray-600 dark:text-cloud-dancer/80 mb-6">
                Cookies are small text files that are stored on your device when you visit our website.
                They help us provide you with a better experience by remembering your preferences and
                understanding how you use our site.
              </p>

              <h2 className="text-2xl font-unbounded font-bold mt-8 mb-4">How We Use Cookies</h2>
              <p className="text-gray-600 dark:text-cloud-dancer/80 mb-4">
                We use cookies for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-cloud-dancer/80 mb-6 space-y-2">
                <li><strong>Necessary Cookies:</strong> Required for the website to function properly (e.g., remembering your region preference)</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website (e.g., Microsoft Clarity)</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements and track campaign performance</li>
              </ul>

              <h2 className="text-2xl font-unbounded font-bold mt-8 mb-4">Managing Cookies</h2>
              <p className="text-gray-600 dark:text-cloud-dancer/80 mb-6">
                You can manage your cookie preferences at any time through our cookie consent banner
                or by adjusting your browser settings. Please note that disabling certain cookies may
                affect your experience on our website.
              </p>

              <h2 className="text-2xl font-unbounded font-bold mt-8 mb-4">Contact Us</h2>
              <p className="text-gray-600 dark:text-cloud-dancer/80">
                If you have any questions about our cookie policy, please contact us at{' '}
                <a href="mailto:info@blackarrowtechnologies.com" className="text-warm-sand hover:underline">
                  info@blackarrowtechnologies.com
                </a>
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>
    </main>
  );
}
