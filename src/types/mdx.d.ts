interface Post {
  title: string;
  date: date;
  description: string;
  body: { code: string };
  _id: string;
  _raw: {
    sourceFilePath: string;
    sourceFileName: string;
    sourceFileDir: string;
    contentType: string;
    flattenedPath: string;
  };
  thumbnail?: string;
  type: string;
  url: string;
}

type PostsResult = {
  previousPost?: Post;
  nextPost?: Post;
  currentPost?: Post;
};
