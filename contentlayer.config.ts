import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypeFigure from 'rehype-figure';
import rehypeImgSize from 'rehype-img-size';
import rehypePrettyCode from 'rehype-pretty-code';
const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'string',
      required: true,
    },
    url: {
      type: 'string',
      required: true,
    },
    thumbnail: { type: 'string', required: false },
  },
  computedFields: {
    description: {
      type: 'string',
      resolve: (doc) => {
        // frontmatter의 description이 있으면 사용
        if (doc.description) {
          return doc.description;
        }
        // 본문에서 자동 생성
        const content = doc.body.raw;

        // frontmatter 제거
        const withoutFrontmatter = content
          .replace(/^---[\s\S]*?---/, '')
          .trim();

        // 마크다운 문법 및 HTML 태그 제거
        const plainText = withoutFrontmatter
          .replace(/```[\s\S]*?```/g, '') // 코드 블록
          .replace(/`[^`]+`/g, '') // 인라인 코드
          .replace(/#{1,6}\s+/g, '') // 헤더
          .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '') // 이미지 링크
          .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // 링크
          .replace(/https?:\/\/[^\s]+/g, '') // bare URL
          .replace(/\*\*(.+?)\*\*/g, '$1') // bold
          .replace(/\*(.+?)\*/g, '$1') // italic
          .replace(/<[^>]+>/g, '') // HTML 태그
          .replace(/\n+/g, ' ') // 줄바꿈을 공백으로
          .replace(/\s+/g, ' ') // 연속된 공백을 하나로
          .trim();

        // 150자로 자르기
        return plainText.slice(0, 150) + (plainText.length > 150 ? '...' : '');
      },
    },
  },
}));

const rehypeoptions = {
  // Use one of Shiki's packaged themes
  theme: 'dark-plus',
  // Set to true to keep the background color
  keepBackground: true,
  onVisitLine(node: any) {
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
  },
  onVisitHighlightedLine(node: any) {
    node.properties.className.push('highlighted');
  },
  onVisitHighlightedWord(node: any, id: any) {
    node.properties.className = ['word'];
  },
};

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [
      [rehypePrettyCode, rehypeoptions],
      rehypeFigure,
      [rehypeImgSize, { dir: 'public' }],
    ],
  },
});
