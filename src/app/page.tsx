import PostPreview from 'app/post-preview';
import { latestPosts } from 'lib/contentlayer';

export default function Main() {
  return (
    <div className="flex flex-1 flex-col-reverse md:flex-row">
      <section className="flex flex-1 flex-col gap-4 md:gap-7">
        {latestPosts.map((post) => (
          <PostPreview post={post} key={post._id} />
        ))}
      </section>
    </div>
  );
}
