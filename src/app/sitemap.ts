import { SITE_URL } from 'constants/metadata';
import { latestPost } from 'lib/contentlayer';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = latestPost.map((post) => ({
    url: `${SITE_URL}/${encodeURI(post.url)}`,
    lastModified: new Date(),
  }));
  return [
    { url: `${SITE_URL}`, lastModified: new Date() },
    { url: `${SITE_URL}/about`, lastModified: new Date() },
    ...posts,
  ];
}
