'use client';

import Link from 'next/link';
import { useRegion } from '@/lib/contexts/RegionContext';
import { useAIAudit } from '@/lib/contexts/AIAuditContext';
import { useTheme } from '@/lib/contexts/ThemeContext';
import { REGIONS } from '@/lib/constants/regions';
import { Globe, ChevronDown, Sun, Moon } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import MegaMenu from './MegaMenu';
import Logo from '@/components/ui/Logo';
import Portal from '@/components/ui/Portal';

export default function Header() {
  const { currentRegion, setRegion } = useRegion();
  const { openAudit } = useAIAudit();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [regionMenuOpen, setRegionMenuOpen] = useState(false);
  const [mobileRegionMenuOpen, setMobileRegionMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });
  const lastScrollY = useRef(0);
  const regionMenuRef = useRef<HTMLDivElement>(null);
  const regionButtonRef = useRef<HTMLButtonElement>(null);
  const mobileRegionMenuRef = useRef<HTMLDivElement>(null);

  // Handle scroll behavior - show on scroll up, hide on scroll down (all devices)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update isScrolled state for styling
      setIsScrolled(currentScrollY > 50);

      // Show/hide header on all devices based on scroll direction
      // Always show at top of page
      if (currentScrollY < 100) {
        setIsVisible(true);
      }
      // Scrolling up - show header
      else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }
      // Scrolling down - hide header (only if scrolled past threshold)
      else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Close region menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const isInsideButton = regionButtonRef.current?.contains(target);
      const isInsideDropdown = (event.target as HTMLElement).closest('[data-region-dropdown]');

      if (!isInsideButton && !isInsideDropdown) {
        setRegionMenuOpen(false);
      }
    }

    if (regionMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [regionMenuOpen]);

  // Calculate dropdown position when opening
  useEffect(() => {
    if (regionMenuOpen && regionButtonRef.current) {
      const rect = regionButtonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
  }, [regionMenuOpen]);

  // Close mobile region menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mobileRegionMenuRef.current && !mobileRegionMenuRef.current.contains(event.target as Node)) {
        setMobileRegionMenuOpen(false);
      }
    }

    if (mobileRegionMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [mobileRegionMenuOpen]);

  // Handle keyboard navigation for region menu
  const handleRegionKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setRegionMenuOpen(false);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!regionMenuOpen) {
        setRegionMenuOpen(true);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] bg-white/95 dark:bg-deep-obsidian/95 backdrop-blur-sm border-b border-stone-200 dark:border-neutral-700 transition-transform duration-300 ease-in-out ${
        isScrolled ? 'shadow-lg' : ''
      } ${
        !isVisible ? '-translate-y-full' : 'translate-y-0'
      }`}
      onMouseLeave={() => setMegaMenuOpen(false)}
    >
      <nav className={`container mx-auto px-4 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-6'}`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo variant="full" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              onMouseEnter={() => setMegaMenuOpen(true)}
              className={`flex items-center gap-1 text-gray-800 dark:text-cloud-dancer hover:text-warm-sand transition-all px-3 py-2 rounded-md ${
                megaMenuOpen ? 'bg-warm-sand/10 text-warm-sand' : ''
              }`}
              aria-label="Services menu"
              aria-expanded={megaMenuOpen}
            >
              <span className="font-medium">Services</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <Link href="/case-studies" className="text-gray-800 dark:text-cloud-dancer hover:text-warm-sand transition-colors">
              Case Studies
            </Link>
            <Link href="/portfolio" className="text-gray-800 dark:text-cloud-dancer hover:text-warm-sand transition-colors">
              Portfolio
            </Link>
            <Link href="/blog" className="text-gray-800 dark:text-cloud-dancer hover:text-warm-sand transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-800 dark:text-cloud-dancer hover:text-warm-sand transition-colors">
              Contact
            </Link>

            {/* Region Switcher */}
            <div className="relative" ref={regionMenuRef}>
              <button
                ref={regionButtonRef}
                onClick={() => setRegionMenuOpen(!regionMenuOpen)}
                onKeyDown={handleRegionKeyDown}
                className="flex items-center space-x-2 text-gray-800 dark:text-cloud-dancer hover:text-warm-sand hover:bg-warm-sand/10 transition-all min-h-[44px] px-3 py-2 rounded-md border border-stone-300 dark:border-neutral-700 bg-stone-50 dark:bg-neutral-800"
                aria-label="Select region"
                aria-expanded={regionMenuOpen}
                aria-haspopup="true"
              >
                <Globe size={20} strokeWidth={2} />
                <span className="text-sm font-medium">{currentRegion}</span>
                <ChevronDown size={14} className={`transition-transform ${regionMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Region Dropdown - Rendered via Portal to escape header stacking context */}
              {regionMenuOpen && (
                <Portal>
                  <div
                    data-region-dropdown
                    className="fixed w-48 bg-white dark:bg-neutral-800 border border-stone-300 dark:border-neutral-700 rounded-md shadow-2xl"
                    role="menu"
                    aria-orientation="vertical"
                    style={{
                      top: dropdownPosition.top,
                      right: dropdownPosition.right,
                      zIndex: 99999,
                      boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                    }}
                  >
                    {Object.entries(REGIONS).map(([code, region]) => (
                      <button
                        key={code}
                        onClick={() => {
                          setRegion(code as typeof currentRegion);
                          setRegionMenuOpen(false);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Escape') {
                            setRegionMenuOpen(false);
                          }
                        }}
                        className={`block w-full text-left px-4 py-3 min-h-[44px] text-sm hover:bg-warm-sand/10 transition-colors ${currentRegion === code ? 'text-warm-sand font-semibold' : 'text-gray-800 dark:text-cloud-dancer'
                          }`}
                        role="menuitem"
                      >
                        {region.name}
                      </button>
                    ))}
                  </div>
                </Portal>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-800 dark:text-cloud-dancer hover:text-warm-sand transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* CTA Button */}
            <button
              onClick={() => openAudit()}
              className="bg-warm-sand text-deep-obsidian font-bold px-6 py-3 rounded-md hover:bg-warm-sand/90 transition-all"
            >
              Start Your AI Audit
            </button>
          </div>

          {/* Mobile Menu Button - Minimum 44px touch target */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-800 dark:text-cloud-dancer p-3 -mr-3 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            <Link
              href="/services"
              className="block text-gray-800 dark:text-cloud-dancer hover:text-warm-sand transition-colors py-3 min-h-[44px]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/case-studies"
              className="block text-gray-800 dark:text-cloud-dancer hover:text-warm-sand transition-colors py-3 min-h-[44px]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Case Studies
            </Link>
            <Link
              href="/portfolio"
              className="block text-gray-800 dark:text-cloud-dancer hover:text-warm-sand transition-colors py-3 min-h-[44px]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link
              href="/blog"
              className="block text-gray-800 dark:text-cloud-dancer hover:text-warm-sand transition-colors py-3 min-h-[44px]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="block text-gray-800 dark:text-cloud-dancer hover:text-warm-sand transition-colors py-3 min-h-[44px]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>

            {/* Region Selector for Mobile */}
            <div className="border-t border-stone-200 dark:border-neutral-700 pt-4 mt-4">
              <div className="mb-2 text-sm font-medium text-gray-600 dark:text-neutral-400">
                Region
              </div>
              <div className="relative" ref={mobileRegionMenuRef}>
                <button
                  onClick={() => setMobileRegionMenuOpen(!mobileRegionMenuOpen)}
                  className="flex items-center justify-between w-full text-gray-800 dark:text-cloud-dancer hover:text-warm-sand hover:bg-warm-sand/10 transition-all min-h-[44px] px-4 py-3 rounded-md border border-stone-300 dark:border-neutral-700 bg-stone-50 dark:bg-neutral-800"
                  aria-label="Select region"
                  aria-expanded={mobileRegionMenuOpen}
                  aria-haspopup="true"
                >
                  <div className="flex items-center space-x-2">
                    <Globe size={20} strokeWidth={2} />
                    <span className="text-sm font-medium">{currentRegion}</span>
                  </div>
                  <ChevronDown size={16} className={`transition-transform ${mobileRegionMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {mobileRegionMenuOpen && (
                  <div
                    className="absolute left-0 right-0 mt-2 bg-white dark:bg-neutral-800 border border-stone-300 dark:border-neutral-700 rounded-md shadow-2xl z-[9999]"
                    role="menu"
                    aria-orientation="vertical"
                    style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}
                  >
                    {Object.entries(REGIONS).map(([code, region]) => (
                      <button
                        key={code}
                        onClick={() => {
                          setRegion(code as typeof currentRegion);
                          setMobileRegionMenuOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-3 min-h-[44px] text-sm hover:bg-warm-sand/10 transition-colors ${
                          currentRegion === code ? 'text-warm-sand font-semibold' : 'text-gray-800 dark:text-cloud-dancer'
                        }`}
                        role="menuitem"
                      >
                        {region.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Theme Toggle for Mobile */}
            <div className="border-t border-stone-200 dark:border-neutral-700 pt-4 mt-4">
              <button
                onClick={toggleTheme}
                className="flex items-center justify-between w-full text-gray-800 dark:text-cloud-dancer hover:text-warm-sand transition-colors py-3 min-h-[44px]"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <span className="font-medium">Theme</span>
                <span className="flex items-center gap-2">
                  {theme === 'dark' ? (
                    <>
                      <Sun size={20} />
                      <span className="text-sm">Light</span>
                    </>
                  ) : (
                    <>
                      <Moon size={20} />
                      <span className="text-sm">Dark</span>
                    </>
                  )}
                </span>
              </button>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAudit();
              }}
              className="block bg-warm-sand text-deep-obsidian font-bold px-6 py-3 min-h-[44px] rounded-md hover:bg-warm-sand/90 transition-all text-center mt-4 w-full"
            >
              Start Your AI Audit
            </button>
          </div>
        )}
      </nav>

      {/* Mega Menu */}
      <MegaMenu
        isOpen={megaMenuOpen}
        onClose={() => setMegaMenuOpen(false)}
        onOpenAIAudit={() => openAudit()}
      />
    </header>
  );
}
