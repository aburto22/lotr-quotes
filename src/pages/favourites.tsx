import { useAppSelector } from "@hooks/redux";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { colors } from "@styles/cssVariables";
import Layout from "@components/Layout";
import type { IQuote, NextPageWithLayout } from "@types";
import QuoteCard from "@components/QuoteCard";
import { getQuotes } from "@lib/ssg";

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

type FavouritesPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const FavouritesPage: NextPageWithLayout<FavouritesPageProps> = ({
  quotes,
}) => {
  const favourites = useAppSelector((state) => state.favourites);
  const favouriteQuotes = quotes.filter((q) => favourites.includes(q._id));

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
          text-shadow:
            3px 0 black,
            -3px 0 black,
            0 -3px black,
            0 3px black;
          text-align: center;
          margin-bottom: 0.5rem;
          font-family: "Morris Roman", sans-serif;
          font-size: 3rem;
          margin-bottom: 2rem;
        }

        section.board {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          max-width: 100%;
        }

        h2 {
          text-align: center;
        }
      `}</style>

      <h1>Favourites</h1>
      <section className="board">
        {favouriteQuotes.length > 0 ? (
          favouriteQuotes.map((q) => <QuoteCard key={q._id} quote={q} />)
        ) : (
          <h2>Add favourites to see them here</h2>
        )}
      </section>
    </main>
  );
};

FavouritesPage.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default FavouritesPage;
