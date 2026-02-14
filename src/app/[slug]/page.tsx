import PostNavigation from 'app/[slug]/post-navigation';
import { getPostNavigation } from 'app/[slug]/post-utils';
import Utterances from 'app/[slug]/utterances';
import { SITE_URL, title } from 'constants/metadata';
import { format, parseISO } from 'date-fns';
import { latestPosts } from 'lib/contentlayer';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMDXComponent } from 'next-contentlayer/hooks';
import { Post } from 'contentlayer/generated';

export const dynamicParams = false;

export const generateStaticParams = async () =>
  latestPosts.map((post: Post) => {
    return {
      slug: post.url,
    };
  });
export const generateMetadata = ({
  params: { slug },
}: {
  params: { slug: string };
}): Metadata => {
  const decodedSlug = decodeURIComponent(slug);
  const currentPost = latestPosts.find(
    (post: Post) => post.url === decodedSlug,
  );
  const postUrl = `${SITE_URL}/${currentPost?.url}`;
  return {
    metadataBase: new URL(SITE_URL),
    title: `${currentPost?.title} - ${title}`,
    description: currentPost?.description,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      title: `${currentPost?.title} - ${title}`,
      description: currentPost?.description,
      url: postUrl,
      siteName: title,
      locale: 'ko_KR',
      type: 'article',
      publishedTime: currentPost?.date,
      images: [
        {
          url: currentPost?.thumbnail ?? '/imgs/og.jpg',
          width: 1200,
          height: 630,
          alt: currentPost?.title,
        },
      ],
    },
  };
};

export default function page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const decodedSlug = decodeURIComponent(slug);
  const { currentPost, nextPost, previousPost } = getPostNavigation(
    latestPosts,
    decodedSlug,
  );

  if (!currentPost) return notFound();

  const MDXContent = getMDXComponent(currentPost.body.code);

  return (
    <article className="mx-auto w-full max-w-3xl break-all">
      <div className="flex flex-col gap-5 pb-20 pt-5">
        <h1 className="text-4xl font-bold leading-tight text-text-heading">
          {currentPost.title}
        </h1>
        <time
          dateTime={currentPost.date}
          className="text-sm font-medium text-text-muted"
        >
          {format(parseISO(currentPost.date), 'LLLL d, yyyy')}
        </time>
      </div>
      <div className="prose text-text">
        <MDXContent
          components={{
            a: (props) => (
              <Link target="_blank" href={props.href || ''}>
                {props.children}
              </Link>
            ),
          }}
        />
      </div>
      <PostNavigation nextPost={nextPost} previousPost={previousPost} />
      <Utterances />
    </article>
  );
}
