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
      title: 'Fallacy Dossier — VeriLens',
      description: 'UNESCO Global MIL Cognitive Fallacy & Bias Codex.'
    };
  }

  const siteUrl = 'https://verilens.aprilwang.id';
  const imageUrl = `${siteUrl}/assets/images/fallacies/${fallacy.id}.jpg`;
  const canonicalUrl = `${siteUrl}/codex/${idToSlug(fallacy.id)}`;

  return {
    title: `${fallacy.name} — ${fallacy.subtitle} | VeriLens Codex`,
    description: `${fallacy.description} Spot and debunk this manipulation pattern with the Stanford SIFT protocol.`,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: `${fallacy.name}: ${fallacy.subtitle} — VeriLens`,
      description: fallacy.description,
      url: canonicalUrl,
      siteName: 'VeriLens — UNESCO MIL 2026',
      images: [
        {
          url: imageUrl,
          width: 1024,
          height: 1024,
          alt: `${fallacy.name} Renaissance Allegorical Fresco Emblem`,
          type: 'image/jpeg'
        }
      ],
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${fallacy.name} — VeriLens Codex`,
      description: fallacy.description,
      images: [imageUrl]
    }
  };
}

export default function CodexSlugLayout({ children }) {
  return children;
}
