import Head from "next/head";
import type { AppProps } from "next/app";
import { NextPageWithLayout } from "@types";
import { Provider } from "react-redux";
import store from "@store";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Provider store={store}>
      <Head>
        <title>LOTR Quotes</title>
        <meta name="description" content="Get the best quotes from LOTR" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style jsx global>{`
        @font-face {
          font-family: "Morris Roman";
          src: url(/fonts/morris_roman.ttf);
        }

        @font-face {
          font-family: Anirom;
          src: url(/fonts/anirom.ttf);
        }

        @font-face {
          font-family: Anirom;
          src: url(/fonts/anirom.ttf);
          font-weight: bold;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: Anirom, sans-serif;
          background-color: black;
          color: white;
        }

        #__next {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
      `}</style>

      {getLayout(<Component {...pageProps} />)}
    </Provider>
  );
}

export default MyApp;
