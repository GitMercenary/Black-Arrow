import Section from '@/components/ui/Section';
import FadeIn from '@/components/animations/FadeIn';

export const metadata = {
  title: 'Terms of Service | Black Arrow Technologies',
  description: 'Terms and conditions governing the use of Black Arrow Technologies services and website.',
};

export default function TermsPage() {
  return (
    <main>
      <Section className="pt-40 pb-12">
        <div className="max-w-3xl mx-auto">
          <FadeIn direction="up" duration={0.6}>
            <h1 className="text-4xl md:text-5xl font-unbounded font-bold mb-6">
              Terms of Service
            </h1>
          </FadeIn>

          <FadeIn direction="up" duration={0.6} delay={0.1}>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg text-gray-600 dark:text-cloud-dancer/80 mb-8">
                Last updated: February 2026
              </p>

              <h2 className="text-2xl font-unbounded font-bold mt-8 mb-4">1. Introduction</h2>
              <p className="text-gray-600 dark:text-cloud-dancer/80 mb-6">
                These Terms of Service (&quot;Terms&quot;) govern your use of the website and services
                provided by Black Arrow Technologies, a trading name of Lateral View Solutions Ltd
                (Company No: 16673116), registered at 71-75 Shelton Street, Covent Garden, London WC2H 9JQ
                (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). By accessing our website or engaging our services,
                you agree to be bound by these Terms.
              </p>

              <h2 className="text-2xl font-unbounded font-bold mt-8 mb-4">2. Services</h2>
              <p className="text-gray-600 dark:text-cloud-dancer/80 mb-4">
                We provide digital services including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-cloud-dancer/80 mb-6 space-y-2">
                <li>Website design and development</li>
                <li>E-commerce development</li>
                <li>Performance advertising (Google Ads, Meta Ads, LinkedIn)</li>
                <li>Search engine optimisation (SEO)</li>
                <li>Automation and AI integration</li>
                <li>Digital strategy and consulting</li>
              </ul>
              <p className="text-gray-600 dark:text-cloud-dancer/80 mb-6">
                The specific scope, deliverables, and timelines for any project will be agreed upon in a
                separate proposal or statement of work.
              </p>

              <h2 className="text-2xl font-unbounded font-bold mt-8 mb-4">3. Client Obligations</h2>
              <p className="text-gray-600 dark:text-cloud-dancer/80 mb-4">
                When engaging our services, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-cloud-dancer/80 mb-6 space-y-2">
                <li>Provide accurate and complete information necessary for the project</li>
                <li>Respond to requests for feedback or approvals in a timely manner</li>
                <li>Ensure you have the rights to any content you provide to us</li>
                <li>Make payments according to the agreed schedule</li>
              </ul>

              <h2 className="text-2xl font-unbounded font-bold mt-8 mb-4">4. Intellectual Property</h2>
              <p className="text-gray-600 dark:text-cloud-dancer/80 mb-6">
                Upon full payment, you will own the final deliverables created specifically for your project.
                We retain ownership of any pre-existing tools, frameworks, templates, and methodologies used
                in the creation of deliverables. We reserve the right to showcase completed work in our
                portfolio unless otherwise agreed in writing.
              </p>

              <h2 className="text-2xl font-unbounded font-bold mt-8 mb-4">5. Payment Terms</h2>
              <p className="text-gray-600 dark:text-cloud-dancer/80 mb-6">
                Payment terms will be specified in individual project proposals. Unless otherwise stated,
                invoices are due within 14 days of issue. Late payments may incur interest at 8% above
                the Bank of England base rate, in accordance with the Late Payment of Commercial Debts
                (Interest) Act 1998.
              </p>

              <h2 className="text-2xl font-unbounded font-bold mt-8 mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-600 dark:text-cloud-dancer/80 mb-6">
                To the maximum extent permitted by law, our total liability for any claim arising out of
                or relating to these Terms or our services shall not exceed the total fees paid by you for
                the specific service giving rise to the claim. We shall not be liable for any indirect,
                incidental, consequential, or special damages, including but not limited to loss of profits,
                data, or business opportunities.
              </p>

              <h2 className="text-2xl font-unbounded font-bold mt-8 mb-4">7. Confidentiality</h2>
              <p className="text-gray-600 dark:text-cloud-dancer/80 mb-6">
                Both parties agree to keep confidential any proprietary information shared during the course
                of the engagement. This obligation survives the termination of any agreement between us.
              </p>

              <h2 className="text-2xl font-unbounded font-bold mt-8 mb-4">8. Termination</h2>
              <p className="text-gray-600 dark:text-cloud-dancer/80 mb-6">
                Either party may terminate an engagement by providing 14 days written notice. In the event
                of termination, you will be responsible for payment of all work completed up to the date of
                termination. Any deposits paid are non-refundable unless otherwise specified in the project
                agreement.
              </p>

              <h2 className="text-2xl font-unbounded font-bold mt-8 mb-4">9. Website Use</h2>
              <p className="text-gray-600 dark:text-cloud-dancer/80 mb-4">
                When using our website, you agree not to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-cloud-dancer/80 mb-6 space-y-2">
                <li>Use the website for any unlawful purpose</li>
                <li>Attempt to gain unauthorised access to any part of the website</li>
                <li>Introduce viruses or other malicious code</li>
                <li>Scrape or harvest data from the website without permission</li>
              </ul>

              <h2 className="text-2xl font-unbounded font-bold mt-8 mb-4">10. Governing Law</h2>
              <p className="text-gray-600 dark:text-cloud-dancer/80 mb-6">
                These Terms are governed by and construed in accordance with the laws of England and Wales.
                Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the
                courts of England and Wales.
              </p>

              <h2 className="text-2xl font-unbounded font-bold mt-8 mb-4">11. Changes to These Terms</h2>
              <p className="text-gray-600 dark:text-cloud-dancer/80 mb-6">
                We may update these Terms from time to time. Any changes will be posted on this page with
                an updated revision date. Continued use of our website or services after changes constitutes
                acceptance of the revised Terms.
              </p>

              <h2 className="text-2xl font-unbounded font-bold mt-8 mb-4">12. Contact Us</h2>
              <p className="text-gray-600 dark:text-cloud-dancer/80">
                For any questions about these Terms, please contact us at{' '}
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
