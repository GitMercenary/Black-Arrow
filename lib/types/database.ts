export type RegionCode = 'UK' | 'UAE' | 'IND';

export interface Region {
  id: string;
  code: RegionCode;
  name: string;
  phone: string | null;
  address: string | null;
  currency: string;
  timezone: string;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  region_id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  service_interest: string | null;
  budget_range: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  assigned_to: string | null;
  notes: string | null;
  source: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  region_tags: string[];
  published: boolean;
  published_at: string | null;
  author_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  full_name: string | null;
  role: 'admin' | 'editor' | 'viewer';
  default_region: string;
  allowed_regions: string[];
  is_super_admin: boolean;
  created_at: string;
  last_login: string | null;
}

export interface Stat {
  id: string;
  key: string;
  value: string;
  label: string;
  updated_at: string;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
  unsubscribed_at: string | null;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  client: string | null;
  description: string;
  category: 'landing-page' | 'business-site' | 'custom-web-app';
  industry: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
  thumbnail: string | null;
  images: string[];
  live_url: string | null;
  tags: string[];
  highlights: string[];
  region_visibility: string[];
  show_on_portfolio: boolean;
  show_on_website_dev: boolean;
  show_on_landing_page: boolean;
  show_on_business_site: boolean;
  show_on_custom_web_app: boolean;
  functionality: Record<string, unknown> | null;
  uiux: Record<string, unknown> | null;
  branding: Record<string, unknown> | null;
  year: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

// Form submission types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  service_interest?: string;
  budget_range: string;
}

export interface PostInsertData {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  region_tags: string[];
  published: boolean;
  published_at: string | null;
  author_id: string;
}

export interface PostUpdateData extends Partial<PostInsertData> {
  updated_at?: string;
}
