import QuoteCard from "@components/QuoteCard";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { colors } from "@styles/cssVariables";
import Layout from "@components/Layout";
import { getQuotes } from "@lib/ssg";
import { NextPageWithLayout } from "@types";

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

        section.board {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          max-width: 100%;
        }
      `}</style>
      <h1>Quotes</h1>
      <section className="board">
        {quotes.length > 0 ? (
          quotes.map((q) => <QuoteCard key={q.id} quote={q} />)
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
