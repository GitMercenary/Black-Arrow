import Section from '@/components/ui/Section';
import FadeIn from '@/components/animations/FadeIn';

export const metadata = {
  title: 'Privacy Policy | Black Arrow Technologies',
  description: 'Learn about how Black Arrow Technologies collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <Section className="pt-40 pb-12">
        <div className="max-w-3xl mx-auto">
          <FadeIn direction="up" duration={0.6}>
            <h1 className="text-4xl md:text-5xl font-unbounded font-bold mb-6">
              Privacy Policy
            </h1>
          </FadeIn>

          <FadeIn direction="up" duration={0.6} delay={0.1}>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg text-gray-600 dark:text-cloud-dancer/80 mb-8">
                Last updated: February 2026
              </p>

              <h2 className="text-2xl font-unbounded font-bold mt-8 mb-4">Introduction</h2>
              <p className="text-gray-600 dark:text-cloud-dancer/80 mb-6">
                Black Arrow Technologies (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, and safeguard your personal information
                when you visit our website or use our services.
              </p>

              <h2 className="text-2xl font-unbounded font-bold mt-8 mb-4">Information We Collect</h2>
              <p className="text-gray-600 dark:text-cloud-dancer/80 mb-4">
                We may collect the following types of information:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-cloud-dancer/80 mb-6 space-y-2">
                <li><strong>Contact Information:</strong> Name, email address, phone number when you fill out forms</li>
                <li><strong>Business Information:</strong> Company name, website URL, budget range for project inquiries</li>
                <li><strong>Usage Data:</strong> IP address, browser type, pages visited, and other analytics data</li>
                <li><strong>Communication Data:</strong> Messages you send us via contact forms or email</li>
              </ul>

              <h2 className="text-2xl font-unbounded font-bold mt-8 mb-4">How We Use Your Information</h2>
              <p className="text-gray-600 dark:text-cloud-dancer/80 mb-4">
                We use your information to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-cloud-dancer/80 mb-6 space-y-2">
                <li>Respond to your inquiries and provide requested services</li>
                <li>Send you relevant marketing communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-unbounded font-bold mt-8 mb-4">Data Protection</h2>
              <p className="text-gray-600 dark:text-cloud-dancer/80 mb-6">
                We implement appropriate technical and organizational measures to protect your personal
                data against unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h2 className="text-2xl font-unbounded font-bold mt-8 mb-4">Your Rights</h2>
              <p className="text-gray-600 dark:text-cloud-dancer/80 mb-4">
                Under GDPR and other applicable data protection laws, you have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-cloud-dancer/80 mb-6 space-y-2">
                <li>Access your personal data</li>
                <li>Rectify inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to or restrict processing</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>

              <h2 className="text-2xl font-unbounded font-bold mt-8 mb-4">Contact Us</h2>
              <p className="text-gray-600 dark:text-cloud-dancer/80">
                For any privacy-related questions or to exercise your rights, please contact us at{' '}
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
