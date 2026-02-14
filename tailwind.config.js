/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {},
      colors: ({ colors }) => ({
        text: {
          DEFAULT: colors.gray['300'],   // 본문 텍스트
          heading: '#dbdbdb',            // 제목
          muted: colors.gray['500'],     // 날짜, 보조 텍스트
          link: colors.gray['400'],      // 링크
          'link-hover': colors.gray['300'], // 링크 호버
        },
        bg: {
          DEFAULT: colors.gray['900'],   // 배경
          code: colors.gray['800'],      // 코드 블록 배경
        },
        border: {
          DEFAULT: colors.gray['600'],   // 기본 border
        },
      }),
      typography: ({ theme }) => {
        return {
          DEFAULT: {
            css: {
              'code::before': {
                content: '""',
              },
              'code::after': {
                content: '""',
              },
              img: {
                margin: 'auto',
              },
              pre: {
                fontSize: '12px',
                lineHeight: '22px',
              },
              figcaption: {
                textAlign: 'center',
              },
              code: {
                fontWeight: 500,
                backgroundColor: theme('colors.bg.code'),
                color: theme('colors.text.link'),
                padding: '4px 6px',
                fontSize: '12px',
                borderRadius: '6px',
              },
              h1: {
                color: theme('colors.text.heading'),
              },
              h2: {
                color: theme('colors.text.heading'),
              },
              h3: {
                color: theme('colors.text.heading'),
              },
              h4: {
                color: theme('colors.text.heading'),
              },
              h5: {
                color: theme('colors.text.heading'),
              },
              strong: {
                color: theme('colors.text.muted'),
              },
              blockquote: {
                borderLeftWidth: '4px',
                borderLeftColor: theme('colors.border.DEFAULT'),
                paddingLeft: '1rem',
                fontStyle: 'italic',
                color: theme('colors.text.link'),
              },
              a: {
                color: theme('colors.text.link'),
                '&:hover': {
                  color: theme('colors.text.link-hover'),
                },
              },
              maxWidth: null,
            },
          },
        };
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
