import QuoteCard from "@components/QuoteCard";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { colors } from "@styles/cssVariables";
import Layout from "@components/Layout";
import { getQuotes } from "@lib/ssg";
import { NextPageWithLayout } from "@types";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  filterByCharacterName,
  filterByDialog,
  pipe,
  getPageContent,
} from "@lib/misc";
import Pagination from "@components/Pagination";
import { getQueryParams, getQueryFromUrl } from "@lib/query";

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

type State = {
  dialog: string;
  character: string;
  page: number;
};

type QuotesPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const QuotesPage: NextPageWithLayout<QuotesPageProps> = ({ quotes }) => {
  const { asPath, replace } = useRouter();

  const [state, setState] = useState<State>({
    dialog: "",
    character: "",
    page: 1,
  });

  const [limit] = useState(20);

  useEffect(() => {
    const dialog = getQueryFromUrl(asPath, "dialog") || "";
    const character = getQueryFromUrl(asPath, "character") || "";
    const page = Number(getQueryFromUrl(asPath, "page")) || 1;

    setState({
      dialog,
      character,
      page: Number.isInteger(page) ? page : 1,
    });
  }, [asPath]);

  const handleDialogChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDialog = e.target.value;
    const newState: State = {
      ...state,
      page: 1,
      dialog: newDialog,
    };
    setState(newState);
    const query = getQueryParams(newState);

    replace("/quotes", { query }, { shallow: true });
  };

  const handleCharacterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCharacter = e.target.value;
    const newState = {
      ...state,
      page: 1,
      character: newCharacter,
    };
    setState(newState);
    const query = getQueryParams(newState);

    replace("/quotes", { query }, { shallow: true });
  };

  const filteredQuotes = pipe(
    quotes,
    filterByDialog(state.dialog),
    filterByCharacterName(state.character)
  );

  const paginatedQuotes = getPageContent(state.page, limit)(filteredQuotes);

  const maxPage = Math.ceil(filteredQuotes.length / limit);

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
          font-size: 0.8rem;
        }

        input {
          margin-left: 0.5rem;
          display: block;
          padding: 0.2rem 0.4rem;
          font-size: 0.8rem;
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

          input {
            font-size: 1rem;
          }

          label {
            font-size: 1rem;
          }
        }
      `}</style>
      <h1>Quotes</h1>
      <section className="form">
        <label htmlFor="dialog">
          Dialog:
          <input
            type="text"
            value={state.dialog}
            onChange={handleDialogChange}
            name="dialog"
          />
        </label>
        <label htmlFor="character">
          Character:
          <input
            type="text"
            value={state.character}
            onChange={handleCharacterChange}
            name="character"
          />
        </label>
      </section>
      <section className="board">
        {paginatedQuotes.length > 0 ? (
          paginatedQuotes.map((q) => <QuoteCard key={q._id} quote={q} />)
        ) : (
          <h2>No quotes found</h2>
        )}
      </section>
      {filteredQuotes.length > limit && (
        <Pagination
          setState={setState}
          state={state}
          maxPage={maxPage}
          path="/quotes"
        />
      )}
    </main>
  );
};

QuotesPage.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default QuotesPage;
