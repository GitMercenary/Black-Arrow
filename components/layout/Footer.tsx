'use client';

import Link from 'next/link';
import { useRegion } from '@/lib/contexts/RegionContext';
import { REGIONS } from '@/lib/constants/regions';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import Logo from '@/components/ui/Logo';

export default function Footer() {
  const { currentRegion } = useRegion();
  const regionData = REGIONS[currentRegion];

  return (
    <footer className="bg-slate-100 dark:bg-deep-obsidian border-t border-warm-sand/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Logo variant="full" className="mb-4" />
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Precision. Performance. Profit.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-unbounded font-bold text-sm mb-4 text-gray-900 dark:text-cloud-dancer">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/website-development" className="text-gray-700 dark:text-cloud-dancer/60 hover:text-warm-sand dark:hover:text-warm-sand transition-colors">
                  Website Development
                </Link>
              </li>
              <li>
                <Link href="/services/ads" className="text-gray-700 dark:text-cloud-dancer/60 hover:text-warm-sand dark:hover:text-warm-sand transition-colors">
                  Performance Ads
                </Link>
              </li>
              <li>
                <Link href="/services/automation" className="text-gray-700 dark:text-cloud-dancer/60 hover:text-warm-sand dark:hover:text-warm-sand transition-colors">
                  Automation & AI
                </Link>
              </li>
              <li>
                <Link href="/services/ecommerce" className="text-gray-700 dark:text-cloud-dancer/60 hover:text-warm-sand dark:hover:text-warm-sand transition-colors">
                  E-Commerce Development
                </Link>
              </li>
              <li>
                <Link href="/services/seo" className="text-gray-700 dark:text-cloud-dancer/60 hover:text-warm-sand dark:hover:text-warm-sand transition-colors">
                  Technical SEO, GEO & AEO
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-unbounded font-bold text-sm mb-4 text-gray-900 dark:text-cloud-dancer">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-700 dark:text-cloud-dancer/60 hover:text-warm-sand dark:hover:text-warm-sand transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-gray-700 dark:text-cloud-dancer/60 hover:text-warm-sand dark:hover:text-warm-sand transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-700 dark:text-cloud-dancer/60 hover:text-warm-sand dark:hover:text-warm-sand transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-700 dark:text-cloud-dancer/60 hover:text-warm-sand dark:hover:text-warm-sand transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-700 dark:text-cloud-dancer/60 hover:text-warm-sand dark:hover:text-warm-sand transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-unbounded font-bold text-sm mb-4 text-gray-900 dark:text-cloud-dancer">Contact ({regionData.name})</h4>
            {regionData.contact.companyName && (
              <p className="text-sm font-medium text-gray-800 dark:text-cloud-dancer mb-3">
                {regionData.contact.companyName}
              </p>
            )}
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Phone size={16} className="mt-0.5 text-warm-sand flex-shrink-0" strokeWidth={2} />
                <a href={`tel:${regionData.contact.phone.replace(/\s/g, '')}`} className="text-gray-700 dark:text-cloud-dancer/60 hover:text-warm-sand dark:hover:text-warm-sand transition-colors">
                  {regionData.contact.phone}
                </a>
              </li>
              {regionData.contact.whatsapp !== regionData.contact.phone && (
                <li className="flex items-start space-x-2">
                  <MessageCircle size={16} className="mt-0.5 text-warm-sand flex-shrink-0" strokeWidth={2} />
                  <a
                    href={`https://wa.me/${regionData.contact.whatsapp.replace(/[\s+]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 dark:text-cloud-dancer/60 hover:text-warm-sand dark:hover:text-warm-sand transition-colors"
                  >
                    WhatsApp: {regionData.contact.whatsapp}
                  </a>
                </li>
              )}
              <li className="flex items-start space-x-2">
                <Mail size={16} className="mt-0.5 text-warm-sand flex-shrink-0" strokeWidth={2} />
                <a href={`mailto:${regionData.contact.email}`} className="text-gray-700 dark:text-cloud-dancer/60 hover:text-warm-sand dark:hover:text-warm-sand transition-colors">
                  {regionData.contact.email}
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="mt-0.5 text-warm-sand flex-shrink-0" strokeWidth={2} />
                <span className="text-gray-700 dark:text-cloud-dancer/60">
                  {regionData.contact.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-warm-sand/20">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-300">
            <p>&copy; {new Date().getFullYear()} Black Arrow Technologies. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
              <Link href="/legal/privacy" className="text-gray-500 dark:text-cloud-dancer/40 hover:text-warm-sand dark:hover:text-warm-sand transition-colors">
                Privacy Policy
              </Link>
              <Link href="/legal/cookies" className="text-gray-500 dark:text-cloud-dancer/40 hover:text-warm-sand dark:hover:text-warm-sand transition-colors">
                Cookie Policy
              </Link>
              <Link href="/legal/terms" className="text-gray-500 dark:text-cloud-dancer/40 hover:text-warm-sand dark:hover:text-warm-sand transition-colors">
                Terms
              </Link>
              <span className="text-gray-500 dark:text-cloud-dancer/40">Google Partner</span>
              <span className="text-gray-500 dark:text-cloud-dancer/40">Meta Business Partner</span>
            </div>
          </div>
          {currentRegion === 'UK' && (
            <p className="text-xs text-gray-400 dark:text-cloud-dancer/30 text-center mt-4">
              Black Arrow Technologies is a trading name of Lateral View Solutions Ltd (Company No: 16673116).
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
