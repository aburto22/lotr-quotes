import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import type { ParsedUrlQuery } from "querystring";
import { colors } from "@styles/cssVariables";
import Layout from "@components/Layout";
import { getCharacterById, getCharactersId } from "@lib/ssg";
import type { Character } from "@lib/ssg";
import { NextPageWithLayout } from "@types";
import CharacterProperty from "@components/CharacterProperty";
import { useRouter } from "next/router";

type ReturnTypeStaticProps = {
  character: Character;
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const ids = await getCharactersId();
  const paths = ids.map((i) => ({ params: { id: i } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  ReturnTypeStaticProps,
  Params
> = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const { id } = params;
  const character = await getCharacterById(id);

  if (!character) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      character,
    },
  };
};

type CharacterPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const CharacterPage: NextPageWithLayout<CharacterPageProps> = ({
  character,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <main>
      <style jsx>{`
        main {
          width: max-content;
          max-width: 100%;
          color: white;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        h1 {
          color: var(--yellow);
          text-shadow: 3px 0 black, -3px 0 black, 0 -3px black, 0 3px black;
          text-align: center;
          margin-bottom: 1.5rem;
          font-family: "Morris Roman", sans-serif;
          font-size: 3rem;
        }

        p {
          margin-bottom: 0.2rem;
          padding: 0 1rem 0;
          color: white;
        }

        a {
          margin-top: 1rem;
          display: block;
          text-align: center;
          text-decoration: none;
          color: var(--lightblue);
          font-size: 0.9rem;
          transition: transform 0.2s;
        }

        a:hover {
          transform: scale(1.2);
        }

        image {
          display: block;
          margin: 0.5rem auto 1.5rem;
          max-width: 100%;
        }

        button {
          margin-top: 1rem;
          display: block;
          text-align: center;
          color: var(--lightblue);
          font-size: 0.9rem;
          transition: transform 0.2s;
          background-color: transparent;
          border: none;
          cursor: pointer;
          width: 100%;
          font-family: Anirom;
        }

        button:hover {
          transform: scale(1.1);
        }
      `}</style>

      <h1>{character.name}</h1>
      {/* {image && (
        <img
          src={image}
          className="character-main__image"
          alt={character.name}
        />
      )} */}
      <CharacterProperty label="Race" prop={character.race} />
      <CharacterProperty label="Gender" prop={character.gender} />
      <CharacterProperty label="Birth" prop={character.birth} />
      <CharacterProperty label="Spouse" prop={character.spouse} />
      <CharacterProperty label="Death" prop={character.death} />
      <CharacterProperty label="Realm" prop={character.realm} />
      <CharacterProperty label="Hair" prop={character.hair} />
      <CharacterProperty label="Height" prop={character.height} />
      {character.wikiUrl && <a href={character.wikiUrl}>Visit wikipedia</a>}
      <button onClick={handleClick} type="button">
        Go back...
      </button>
    </main>
  );
};

CharacterPage.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default CharacterPage;
