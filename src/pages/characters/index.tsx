import CharacterCard from "@components/CharacterCard";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { colors } from "@styles/cssVariables";
import Layout from "@components/Layout";
import { getCharacters } from "@lib/ssg";
import { NextPageWithLayout } from "@types";

type ReturnTypeStaticProps = {
  characters: Awaited<ReturnType<typeof getCharacters>>;
};

export const getStaticProps: GetStaticProps<
  ReturnTypeStaticProps
> = async () => {
  const characters = await getCharacters();

  return {
    props: {
      characters,
    },
  };
};

type CharacterPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const CharactersPage: NextPageWithLayout<CharacterPageProps> = ({
  characters,
}) => {
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
          justify-content: space-around;
          align-items: center;
        }

        @media screen and (min-width: 30rem) {
          section.board {
            justify-content: center;
          }
        }
      `}</style>

      <h1>Characters</h1>
      <section className="board">
        {characters.map((c) => (
          <CharacterCard key={c._id} character={c} />
        ))}
      </section>
    </main>
  );
};

CharactersPage.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default CharactersPage;
