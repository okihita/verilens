import { fallacies, idToSlug, slugToId } from '@verilens/shared';

export async function generateStaticParams() {
  return fallacies.map(f => ({
    slug: idToSlug(f.id)
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const targetId = slugToId(slug);
  const fallacy = fallacies.find(f => f.id === targetId || f.id === slug);

  if (!fallacy) {
    return {
      title: 'Fallacy Guide — VeriLens',
      description: 'UNESCO Global MIL Cognitive Fallacy & Bias Codex.'
    };
  }

  const siteUrl = 'https://verilens.aprilwang.id';
  const imageUrl = `${siteUrl}/assets/images/fallacies/${fallacy.id}.jpg`;
  const canonicalUrl = `${siteUrl}/codex/${idToSlug(fallacy.id)}`;

  return {
    title: `${fallacy.name} (${fallacy.subtitle}) — Cognitive Defense Guide`,
    description: `${fallacy.description} Explore 5 real-world field case studies and verification strategies.`,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: `${fallacy.name}: ${fallacy.subtitle}`,
      description: `${fallacy.description} 5 real-world field case studies and verification guide.`,
      url: canonicalUrl,
      siteName: 'Media Literacy & Critical Thinking Codex',
      images: [
        {
          url: imageUrl,
          width: 1024,
          height: 1024,
          alt: `${fallacy.name} Artwork Emblem`,
          type: 'image/jpeg'
        }
      ],
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${fallacy.name}: ${fallacy.subtitle}`,
      description: `${fallacy.description} 5 real-world field case studies and verification guide.`,
      images: [imageUrl]
    }
  };
}

export default function CodexSlugLayout({ children }) {
  return children;
}
