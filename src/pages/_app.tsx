import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        @font-face {
          @font-face {
            font-family: "Morris Roman";
            src: url(/public/fonts/morris_roman.ttf);
          }

          @font-face {
            font-family: Anirom;
            src: url(/public/fonts/anirom.ttf);
          }

          @font-face {
            font-family: Anirom;
            src: url(/public/fonts/anirom.ttf);
            font-weight: bold;
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: Anirom, sans-serif;
            background: url("/public/imgs/general_bg_transparent.png");
            background-position: center;
            background-size: cover;
            background-color: black;
            background-attachment: fixed;
            color: white;
          }

          #root {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
          }
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
