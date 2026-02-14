import 'app/globals.css';

import Header from 'app/header';
import { pretendard } from 'lib/font';
import NotFound from 'app/not-found';

export default function Custom404() {
  return (
    <html
      lang="ko"
      className={`${pretendard.className} [scrollbar-gutter:stable]`}
    >
      <body className="flex min-h-screen flex-col bg-bg text-text">
        <Header />
        <main className="flex flex-1 px-4 pb-[100px] pt-10 sm:px-[37px] md:pt-14">
          <div className="mx-auto flex min-h-full w-full max-w-3xl flex-1">
            <NotFound />
          </div>
        </main>
      </body>
    </html>
  );
}
