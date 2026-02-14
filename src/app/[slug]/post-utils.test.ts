import { describe, expect, it } from 'vitest';
import { getPostNavigation } from './post-utils';

const mockPosts: Post[] = [
  {
    url: 'post-3',
    title: '세 번째 포스트',
    date: '2024-01-03',
  } as Post,
  {
    url: 'post-2',
    title: '두 번째 포스트',
    date: '2024-01-02',
  } as Post,
  {
    url: 'post-1',
    title: '첫 번째 포스트',
    date: '2024-01-01',
  } as Post,
];

describe('getPostNavigation', () => {
  it('중간 포스트의 경우 이전글과 다음글이 모두 있어야 함', () => {
    const result = getPostNavigation(mockPosts, 'post-2');

    expect(result.currentPost).toEqual(mockPosts[1]);
    expect(result.nextPost).toEqual(mockPosts[0]);
    expect(result.previousPost).toEqual(mockPosts[2]);
  });

  it('첫 번째 포스트의 경우 이전글만 있어야 함', () => {
    const result = getPostNavigation(mockPosts, 'post-3');

    expect(result.currentPost).toEqual(mockPosts[0]);
    expect(result.nextPost).toBeUndefined();
    expect(result.previousPost).toEqual(mockPosts[1]);
  });

  it('마지막 포스트의 경우 다음글만 있어야 함', () => {
    const result = getPostNavigation(mockPosts, 'post-1');

    expect(result.currentPost).toEqual(mockPosts[2]);
    expect(result.nextPost).toEqual(mockPosts[1]);
    expect(result.previousPost).toBeUndefined();
  });

  it('존재하지 않는 포스트의 경우 빈 객체를 반환해야 함', () => {
    const result = getPostNavigation(mockPosts, 'non-existent');

    expect(result).toEqual({});
    expect(result.currentPost).toBeUndefined();
    expect(result.nextPost).toBeUndefined();
    expect(result.previousPost).toBeUndefined();
  });

  it('포스트가 하나만 있는 경우', () => {
    const singlePost: Post[] = [
      {
        url: 'only-post',
        title: '유일한 포스트',
        date: '2024-01-01',
      } as Post,
    ];

    const result = getPostNavigation(singlePost, 'only-post');

    expect(result.currentPost).toEqual(singlePost[0]);
    expect(result.nextPost).toBeUndefined();
    expect(result.previousPost).toBeUndefined();
  });

  it('빈 배열의 경우 빈 객체를 반환해야 함', () => {
    const result = getPostNavigation([], 'any-slug');

    expect(result).toEqual({});
  });
});
