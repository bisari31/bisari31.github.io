import { allPosts } from 'contentlayer/generated';

export const latestPosts = [...allPosts].sort((a, b) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});
