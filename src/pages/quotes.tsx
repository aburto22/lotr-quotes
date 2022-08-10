import QuoteCard from "@components/QuoteCard";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { colors } from "@styles/cssVariables";
import Layout from "@components/Layout";
import { getQuotes } from "@lib/ssg";
import { NextPageWithLayout } from "@types";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { filterByCharacterName, filterByDialog, pipe } from "@lib/misc";

type ReturnTypeStaticProps = {
  quotes: Awaited<ReturnType<typeof getQuotes>>;
};

export const getStaticProps: GetStaticProps<
  ReturnTypeStaticProps
> = async () => {
  const quotes = await getQuotes();

  return {
    props: {
      quotes,
    },
  };
};

type QuotesPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const QuotesPage: NextPageWithLayout<QuotesPageProps> = ({ quotes }) => {
  const {
    query: { dialog: dialogQuery, character: characterQuery },
  } = useRouter();
  const [dialog, setDialog] = useState("");
  const [character, setCharacter] = useState("");

  useEffect(() => {
    if (typeof dialogQuery === "string") {
      setDialog(dialogQuery);
    }
    if (typeof characterQuery === "string") {
      setCharacter(characterQuery);
    }
  }, [dialogQuery, characterQuery]);

  const filteredQuotes = pipe(
    quotes,
    filterByDialog(dialog),
    filterByCharacterName(character)
  );

  return (
    <main>
      <style jsx>{`
        main {
          width: 70rem;
          max-width: 100%;
          color: white;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        h1 {
          color: ${colors.yellow};
          text-shadow: 3px 0 black, -3px 0 black, 0 -3px black, 0 3px black;
          text-align: center;
          margin-bottom: 0.5rem;
          font-family: "Morris Roman", sans-serif;
          font-size: 3rem;
        }

        section.form {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin: 0 auto 2rem;
          width: max-content;
        }

        label {
          margin: 0.5rem;
          display: flex;
          align-items: center;
          width: max-content;
        }

        input {
          margin-left: 0.5rem;
          display: block;
          padding: 0.2rem 0.4rem;
        }

        section.board {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          max-width: 100%;
        }

        @media screen and (min-width: 30rem) {
          section.form {
            flex-direction: row;
          }
        }
      `}</style>
      <h1>Quotes</h1>
      <section className="form">
        <label htmlFor="dialog">
          Dialog:
          <input
            type="text"
            value={dialog}
            onChange={(e) => setDialog(e.target.value)}
            name="dialog"
          />
        </label>
        <label htmlFor="character">
          Character:
          <input
            type="text"
            value={character}
            onChange={(e) => setCharacter(e.target.value)}
            name="character"
          />
        </label>
      </section>
      <section className="board">
        {filteredQuotes.length > 0 ? (
          filteredQuotes.map((q) => <QuoteCard key={q.id} quote={q} />)
        ) : (
          <h2>No quotes found</h2>
        )}
      </section>
    </main>
  );
};

QuotesPage.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default QuotesPage;
