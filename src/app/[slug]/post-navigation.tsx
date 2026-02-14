import Link from 'next/link';

type PostNavigationProps = {
  nextPost?: Post;
  previousPost?: Post;
};

type NavigationItem = {
  label: string;
  post: Post;
};

export default function PostNavigation({
  nextPost,
  previousPost,
}: PostNavigationProps) {
  const navigationItems: NavigationItem[] = [
    ...(nextPost ? [{ label: '다음 글', post: nextPost }] : []),
    ...(previousPost ? [{ label: '이전 글', post: previousPost }] : []),
  ];

  return (
    <div className="mt-20 flex flex-col gap-3">
      {navigationItems.map(({ label, post }) => (
        <div key={post.url} className="flex items-center gap-1">
          <span>{label}:</span>
          <Link
            href={`/${post.url}`}
            className="text-text-link hover:text-text-link-hover underline"
          >
            {post.title}
          </Link>
        </div>
      ))}
    </div>
  );
}
