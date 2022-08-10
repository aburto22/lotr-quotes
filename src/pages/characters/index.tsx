import CharacterCard from "@components/CharacterCard";
import { ICharacter } from "@types";
import { colors } from "@styles/cssVariables";
import useSWR from "swr";
import Layout from "@components/Layout";
import { fetcher } from "@lib/fetcher";

const Characters = () => {
  const { data: characters } = useSWR("/api/characters", fetcher<ICharacter[]>);

  if (!characters) {
    return null;
  }

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
        {characters?.map((c) => (
          <CharacterCard key={c.id} character={c} />
        ))}
      </section>
    </main>
  );
};

Characters.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Characters;
