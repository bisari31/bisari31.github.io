import { Post } from 'contentlayer/generated';

type PostNavigation = {
  previousPost?: Post;
  nextPost?: Post;
  currentPost?: Post;
};

export function getPostNavigation(posts: Post[], slug: string): PostNavigation {
  const currentIndex = posts.findIndex((post) => post.url === slug);

  if (currentIndex === -1) {
    return {};
  }

  return {
    currentPost: posts[currentIndex],
    nextPost: currentIndex > 0 ? posts[currentIndex - 1] : undefined,
    previousPost:
      currentIndex < posts.length - 1 ? posts[currentIndex + 1] : undefined,
  };
}
