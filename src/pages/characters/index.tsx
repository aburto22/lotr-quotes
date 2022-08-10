import CharacterCard from "@components/CharacterCard";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { colors } from "@styles/cssVariables";
import Layout from "@components/Layout";
import { pipe, filterByName, filterByRace } from "@lib/misc";
import { getCharacters } from "@lib/ssg";
import { NextPageWithLayout } from "@types";
import { useState } from "react";

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
  const [name, setName] = useState("");
  const [race, setRace] = useState("");

  const filteredCharacters = pipe(
    characters,
    filterByName(name),
    filterByRace(race)
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

        input,
        select {
          margin-left: 0.5rem;
          display: block;
          padding: 0.2rem 0.4rem;
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

          section.form {
            flex-direction: row;
          }
        }
      `}</style>

      <h1>Characters</h1>

      <section className="form">
        <label htmlFor="name" className="delayed-input__label">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
          />
        </label>
        <label htmlFor="race">
          Race:
          <select
            value={race}
            onChange={(e) => setRace(e.target.value)}
            className="characters-main__input"
          >
            <option value="">All</option>
            <option value="human">Human</option>
            <option value="elf">Elf</option>
            <option value="hobbit">Hobbit</option>
            <option value="half-elven">Half-elven</option>
            <option value="dwarf">Dwarf</option>
            <option value="orc">Goblin / Orc</option>
            <option value="dragon">Dragon</option>
            <option value="eagle">Eagle</option>
            <option value="spider">Spider</option>
          </select>
        </label>
      </section>
      <section className="board">
        {filteredCharacters.map((c) => (
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
