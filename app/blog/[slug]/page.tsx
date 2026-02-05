'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';
import type { Post } from '@/lib/types/database';
import { Calendar, ArrowLeft, User } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import DOMPurify from 'isomorphic-dompurify';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      const supabase = createClient();

      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (data) {
        setPost(data);
      } else {
        setNotFoundState(true);
      }
      setLoading(false);
    }

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <main>
        <Section className="pt-32">
          <div className="max-w-3xl mx-auto animate-pulse">
            <div className="h-4 bg-slate-ui rounded w-1/4 mb-4"></div>
            <div className="h-10 bg-slate-ui rounded w-full mb-2"></div>
            <div className="h-10 bg-slate-ui rounded w-2/3 mb-8"></div>
            <div className="h-4 bg-slate-ui rounded w-full mb-4"></div>
            <div className="h-4 bg-slate-ui rounded w-full mb-4"></div>
            <div className="h-4 bg-slate-ui rounded w-3/4"></div>
          </div>
        </Section>
      </main>
    );
  }

  if (notFoundState || !post) {
    notFound();
  }

  return (
    <main>
      {/* Back Link */}
      <Section className="pt-32 pb-4">
        <FadeIn direction="up" duration={0.5}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-cloud-dancer/60 hover:text-warm-sand transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </FadeIn>
      </Section>

      {/* Article Header */}
      <Section className="pt-4 pb-8">
        <div className="max-w-3xl mx-auto">
          {/* Meta */}
          <FadeIn direction="up" duration={0.6} delay={0.1}>
            <div className="flex items-center gap-4 text-sm text-cloud-dancer/60 mb-6">
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                {formatDate(post.published_at)}
              </div>
              {post.region_tags && post.region_tags.length > 0 && (
                <div className="flex items-center gap-2">
                  {post.region_tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-slate-ui/50 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>

          {/* Title */}
          <FadeIn direction="up" duration={0.6} delay={0.2}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-unbounded font-bold mb-6 leading-tight">
              {post.title}
            </h1>
          </FadeIn>

          {/* Excerpt */}
          {post.excerpt && (
            <FadeIn direction="up" duration={0.6} delay={0.3}>
              <p className="text-xl text-cloud-dancer/80 leading-relaxed">
                {post.excerpt}
              </p>
            </FadeIn>
          )}
        </div>
      </Section>

      {/* Article Content */}
      <Section className="pt-0">
        <FadeIn direction="up" duration={0.6} delay={0.4}>
          <article className="max-w-3xl mx-auto prose prose-invert prose-lg prose-headings:font-unbounded prose-headings:text-cloud-dancer prose-p:text-cloud-dancer/80 prose-a:text-warm-sand prose-strong:text-cloud-dancer prose-ul:text-cloud-dancer/80 prose-ol:text-cloud-dancer/80">
            <div
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
              className="[&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-12 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-8 [&>h3]:mb-3 [&>p]:mb-6 [&>ul]:mb-6 [&>ol]:mb-6 [&>li]:mb-2"
            />
          </article>
        </FadeIn>
      </Section>

      {/* CTA */}
      <Section className="text-center bg-slate-ui/30">
        <FadeIn direction="up" duration={0.6}>
          <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-6">
            Want to Implement These Strategies?
          </h2>
        </FadeIn>
        <FadeIn direction="up" duration={0.6} delay={0.2}>
          <p className="text-xl text-cloud-dancer/80 mb-8 max-w-2xl mx-auto">
            Get a free audit and see how these insights can work for your business.
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
