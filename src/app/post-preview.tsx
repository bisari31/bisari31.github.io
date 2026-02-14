import { format, parseISO } from 'date-fns';
import Link from 'next/link';

export default function PostPreview({ post }: { post: Post }) {
  return (
    <Link href={post.url} className="group flex w-full flex-col">
      <div className="flex flex-col gap-1 py-3">
        <time dateTime={post.date} className="text-text-muted text-xs sm:text-sm">
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </time>
        <div className="">
          <p className="text-text-heading line-clamp-2 text-base font-semibold group-hover:underline sm:text-xl">
            {post.title}
          </p>
        </div>
      </div>
    </Link>
  );
}
