import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  ogImage?: string;
  schema?: object | object[];
}

export default function SEO({
  title,
  description,
  keywords,
  canonicalPath,
  ogImage = 'https://www.pinnacleconsultant.co.in/images/hero_consulting_meeting.jpg',
  schema,
}: SEOProps) {
  const location = useLocation();
  const fullCanonical = `https://www.pinnacleconsultant.co.in${canonicalPath || location.pathname}`;
  const schemaJson = schema ? JSON.stringify(schema) : null;

  useEffect(() => {
    // 1. Title
    const prevTitle = document.title;
    document.title = title;

    // Helper function to safely update or append meta tags
    const setMeta = (attrName: 'name' | 'property', attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta
    setMeta('name', 'description', description);
    if (keywords) {
      setMeta('name', 'keywords', keywords);
    } else {
      // Drop stale keywords from a previously visited page
      document.querySelector('meta[name="keywords"]')?.remove();
    }

    // 3. Canonical URL
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', fullCanonical);

    // 4. Open Graph Meta Tags
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', fullCanonical);
    setMeta('property', 'og:image', ogImage);

    // 5. Twitter Card Meta Tags
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);

    // 6. Dynamic JSON-LD Route Schema Injection
    let scriptEl: HTMLScriptElement | null = null;
    if (schemaJson) {
      scriptEl = document.createElement('script');
      scriptEl.type = 'application/ld+json';
      scriptEl.setAttribute('data-dynamic-seo', 'true');
      scriptEl.text = schemaJson;
      document.head.appendChild(scriptEl);
    }

    return () => {
      document.title = prevTitle;
      if (scriptEl && scriptEl.parentNode) {
        scriptEl.parentNode.removeChild(scriptEl);
      }
    };
  }, [title, description, keywords, fullCanonical, ogImage, schemaJson]);

  return null;
}
