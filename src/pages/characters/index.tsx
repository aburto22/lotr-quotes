import CharacterCard from "@components/CharacterCard";
import { useRouter } from "next/router";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { colors } from "@styles/cssVariables";
import Layout from "@components/Layout";
import { pipe, filterByName, filterByRace } from "@lib/misc";
import { getCharacters } from "@lib/ssg";
import { NextPageWithLayout, Races } from "@types";
import { useState, useEffect, useRef } from "react";

type ReturnTypeStaticProps = {
  characters: Awaited<ReturnType<typeof getCharacters>>;
};

type QueryParams = {
  name?: string;
  race?: string;
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
  const {
    query: { name: nameQuery, race: raceQuery },
    replace,
  } = useRouter();
  const { current: replaceRef } = useRef(replace);

  const [name, setName] = useState("");
  const [race, setRace] = useState("");

  useEffect(() => {
    if (typeof nameQuery === "string") {
      setName(nameQuery);
    }
    if (
      typeof raceQuery === "string" &&
      Object.values<string>(Races).includes(raceQuery)
    ) {
      setRace(raceQuery);
    }
  }, [nameQuery, raceQuery]);

  useEffect(() => {
    let query: QueryParams = {};

    if (name) {
      query.name = name;
    }

    if (race) {
      query.race = race;
    }

    replaceRef("/characters", { query }, { shallow: true });
  }, [name, race, replaceRef]);

  const filteredCharacters = pipe(
    characters,
    filterByName(name),
    filterByRace(race)
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleRaceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRace(e.target.value);
  };

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
        <label htmlFor="name">
          Name:
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            name="name"
          />
        </label>
        <label htmlFor="race">
          Race:
          <select value={race} onChange={handleRaceChange}>
            <option value="">All</option>
            {Object.entries(Races).map(([n, r]) => (
              <option key={n} value={r}>
                {n}
              </option>
            ))}
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
