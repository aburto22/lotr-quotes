import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>LOTR Quotes</title>
        <meta name="description" content="Get the best quotes from LOTR" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section>
          <h1>Home page</h1>
        </section>
      </main>
    </>
  );
};

export default Home;
