'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useRegion } from '@/lib/contexts/RegionContext';
import { createClient } from '@/lib/supabase/client';
import type { Post } from '@/lib/types/database';
import { Calendar, ArrowRight } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

export default function BlogPage() {
  const { currentRegion } = useRegion();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      const supabase = createClient();

      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .contains('region_tags', [currentRegion])
        .order('published_at', { ascending: false });

      if (data) {
        setPosts(data);
      }
      setLoading(false);
    }

    fetchPosts();
  }, [currentRegion]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <main>
      {/* Hero Section */}
      <Section className="pt-32 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn direction="up" duration={0.6}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-unbounded font-bold mb-6 leading-tight">
              Insights & Strategies
            </h1>
          </FadeIn>
          <FadeIn direction="up" duration={0.6} delay={0.2}>
            <p className="text-xl text-cloud-dancer/80 leading-relaxed max-w-2xl mx-auto">
              Actionable insights on e-commerce, digital marketing, and AI automation
              for businesses in the UK, UAE, and India.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* Posts Grid */}
      <Section className="pt-0">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} hover={false} className="p-6 animate-pulse">
                <div className="h-4 bg-slate-ui rounded w-1/3 mb-4"></div>
                <div className="h-6 bg-slate-ui rounded w-full mb-2"></div>
                <div className="h-6 bg-slate-ui rounded w-2/3 mb-4"></div>
                <div className="h-4 bg-slate-ui rounded w-full mb-2"></div>
                <div className="h-4 bg-slate-ui rounded w-full mb-2"></div>
                <div className="h-4 bg-slate-ui rounded w-1/2"></div>
              </Card>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <FadeIn key={post.id} direction="up" delay={index * 0.1} duration={0.6}>
                <Link href={`/blog/${post.slug}`} className="block group">
                  <Card hover={true} className="p-6 h-full flex flex-col">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-cloud-dancer/60 mb-3">
                      <Calendar size={14} />
                      {formatDate(post.published_at)}
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-unbounded font-bold mb-3 group-hover:text-warm-sand transition-colors">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-cloud-dancer/70 text-sm mb-4 flex-grow">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Read More */}
                    <div className="flex items-center gap-2 text-warm-sand text-sm font-medium mt-auto">
                      Read Article
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
        ) : (
          <FadeIn direction="up" duration={0.6}>
            <Card hover={false} className="p-12 text-center max-w-xl mx-auto">
              <h2 className="text-2xl font-unbounded font-bold mb-4">
                No Posts Yet
              </h2>
              <p className="text-cloud-dancer/70 mb-6">
                We&apos;re working on some great content. Check back soon for insights
                on e-commerce, marketing, and AI automation.
              </p>
              <Link href="/contact">
                <Button variant="secondary">
                  Get Notified When We Publish
                </Button>
              </Link>
            </Card>
          </FadeIn>
        )}
      </Section>

      {/* CTA */}
      <Section className="text-center bg-slate-ui/30">
        <FadeIn direction="up" duration={0.6}>
          <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-6">
            Want Personalized Insights?
          </h2>
        </FadeIn>
        <FadeIn direction="up" duration={0.6} delay={0.2}>
          <p className="text-xl text-cloud-dancer/80 mb-8 max-w-2xl mx-auto">
            Get a free audit tailored to your business. We&apos;ll analyze your
            digital presence and share actionable recommendations.
          </p>
        </FadeIn>
        <FadeIn direction="up" duration={0.6} delay={0.4}>
          <Link href="/contact">
            <Button variant="primary" className="text-lg">
              Start Your AI Audit
            </Button>
          </Link>
        </FadeIn>
      </Section>
    </main>
  );
}
