import './globals.css';

import Header from 'app/header';
import { description, SITE_URL, title } from 'constants/metadata';
import { pretendard } from 'lib/font';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title,
  metadataBase: new URL(SITE_URL),
  description,
  verification: {
    google: 'Hpkw_Y7h8SXfmKT6NXtczhTN2cYscJYKtZMYv2xNhc8',
    other: {
      'naver-site-verification': '06f72a0a0230a44ac409e272e8c6c6932c7a1a3b',
    },
  },
  openGraph: {
    title,
    description,
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/imgs/og.jpg',
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={`${pretendard.className} [scrollbar-gutter:stable]`}
    >
      <body className="flex min-h-screen flex-col bg-gray-900 text-gray-300">
        <Header />
        <main className="flex flex-1 px-4 pb-[100px] pt-10 sm:px-[37px] md:pt-14">
          <div className="mx-auto flex min-h-full w-full max-w-3xl flex-1">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
