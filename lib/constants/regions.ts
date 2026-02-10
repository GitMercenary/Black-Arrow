export type RegionCode = 'UK' | 'UAE' | 'IND';

export interface RegionContact {
  companyName?: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
}

export interface Region {
  code: RegionCode;
  name: string;
  currency: string;
  currencySymbol: string;
  budgetRanges: string[];
  domain: string;
  contact: RegionContact;
}

export const REGIONS: Record<RegionCode, Region> = {
  UK: {
    code: 'UK',
    name: 'United Kingdom',
    currency: 'GBP',
    currencySymbol: '£',
    budgetRanges: ['£1,500+', '£5,000+', '£10,000+', '£25,000+'],
    domain: 'blackarrowtechnologies.com',
    contact: {
      companyName: 'Lateral View Solutions Ltd',
      address: '71-75 Shelton Street, Covent Garden, London WC2H 9JQ',
      phone: '07438 381 906',
      whatsapp: '+44 7506 827 925',
      email: 'info@blackarrowtechnologies.com',
    },
  },
  UAE: {
    code: 'UAE',
    name: 'United Arab Emirates',
    currency: 'AED',
    currencySymbol: 'AED',
    budgetRanges: ['AED 5,000+', 'AED 20,000+', 'AED 40,000+', 'AED 100,000+'],
    domain: 'ae.blackarrowtechnologies.com',
    contact: {
      address: 'Dubai',
      phone: '+971 50 693 4001',
      whatsapp: '+971 50 693 4001',
      email: 'info@blackarrowtechnologies.com',
    },
  },
  IND: {
    code: 'IND',
    name: 'India',
    currency: 'INR',
    currencySymbol: '₹',
    budgetRanges: ['₹1.5L+', '₹5L+', '₹10L+', '₹25L+'],
    domain: 'in.blackarrowtechnologies.com',
    contact: {
      address: '5/13 Milton Street, Wheeler Rd Ext, Balaji Layout, Cooke Town, Bengaluru, Karnataka 560005',
      phone: '+91 8660023218',
      whatsapp: '+91 8660023218',
      email: 'info@blackarrowtechnologies.com',
    },
  },
};

export function getRegionFromHostname(hostname: string): RegionCode {
  if (hostname.startsWith('ae.')) return 'UAE';
  if (hostname.startsWith('in.')) return 'IND';
  return 'UK'; // Default
}
