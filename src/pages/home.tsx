import { colors } from "@styles/cssVariables";
import Layout from "@components/Layout";
import React from "react";
import type { NextPageWithLayout } from "@types";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <style jsx>{`
        section {
          width: 40rem;
          color: white;
          margin: auto;
          padding: 2rem;
        }

        h1 {
          color: ${colors.yellow};
          text-shadow: 3px 0 black, -3px 0 black, 0 -3px black, 0 3px black;
          text-align: center;
          margin-bottom: 1rem;
          font-family: "Morris Roman", sans-serif;
          font-size: 3rem;
        }

        p {
          margin-bottom: 0.6rem;
          color: white;
        }

        p.primary {
          text-align: center;
          font-size: 1.2rem;
          color: ${colors.lightblue};
          margin-bottom: 1rem;
        }
      `}</style>

      <main>
        <section>
          <h1>Welcome to The Lord of the Ring quote website</h1>
          <p className="primary">A website to rule them all.</p>
          <p>
            Here you can find information about characters, quotes and more from
            the Lord of the Rings.
          </p>
          <p>
            To start your journey, just use the navigation menu to go over the
            different categories we have for you.
          </p>
          <p>Safe journey!</p>
        </section>
      </main>
    </>
  );
};

Home.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Home;
