import type { Metadata } from "next";
import { Unbounded, Hanken_Grotesk, JetBrains_Mono, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { RegionProvider } from "@/lib/contexts/RegionContext";
import { AIAuditProvider } from "@/lib/contexts/AIAuditContext";
import { ThemeProvider } from "@/lib/contexts/ThemeContext";
import { ServiceIntentProvider } from "@/lib/contexts/ServiceIntentContext";
import { WebDevQuoteProvider } from "@/lib/contexts/WebDevQuoteContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NewsletterPopup from "@/components/forms/NewsletterPopup";
import AIAuditPopupWrapper from "@/components/forms/AIAuditPopupWrapper";
import WebDevQuotePopup from "@/components/forms/WebDevQuotePopup";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import Chatbot from "@/components/chat/Chatbot";
import MicrosoftClarity from "@/components/analytics/MicrosoftClarity";
import CookieConsent from "@/components/legal/CookieConsent";
import ViewportFix from "@/components/utils/ViewportFix";
import StickyIntentReminder from "@/components/ui/StickyIntentReminder";
import StickyServiceBar from "@/components/ui/StickyServiceBar";

// Original branding (kept for reference)
const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken-grotesk",
  display: "swap",
});

// New 2026 typography system
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const geist = Inter({ // Using Inter as Geist alternative (very 2026)
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Black Arrow Technologies | AI-Native Marketing & Web Development",
  description: "We don't do pretty websites. We engineer digital sales machines for UK, UAE, and India markets.",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  metadataBase: new URL('https://blackarrowtechnologies.com'),
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://blackarrowtechnologies.com',
    siteName: 'Black Arrow Technologies',
    title: 'Black Arrow Technologies | AI-Native Marketing & Web Development',
    description: 'We don\'t do pretty websites. We engineer digital sales machines for UK, UAE, and India markets.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Black Arrow Technologies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Black Arrow Technologies | AI-Native Marketing & Web Development',
    description: 'We don\'t do pretty websites. We engineer digital sales machines for UK, UAE, and India markets.',
    images: ['/og-image.png'],
  },
};

// Viewport configuration for proper mobile rendering
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${unbounded.variable}
        ${hankenGrotesk.variable}
        ${jetbrainsMono.variable}
        ${geist.variable}
        ${spaceMono.variable}
      `}
    >
      <body>
        <ViewportFix />
        <ThemeProvider>
          <RegionProvider>
            <ServiceIntentProvider>
              <AIAuditProvider>
                <WebDevQuoteProvider>
                  <Header />
                  {children}
                  <Footer />
                  <StickyIntentReminder />
                  <StickyServiceBar />
                  <NewsletterPopup delaySeconds={10} />
                  <Chatbot />
                  <AIAuditPopupWrapper />
                  <WebDevQuotePopup />
                  <ExitIntentPopup />
                  <MicrosoftClarity />
                  <CookieConsent />
                </WebDevQuoteProvider>
              </AIAuditProvider>
            </ServiceIntentProvider>
          </RegionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
