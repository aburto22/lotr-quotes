import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import type { ParsedUrlQuery } from "querystring";
import { colors } from "@styles/cssVariables";
import Layout from "@components/Layout";
import Image from "next/legacy/image";
import Link from "next/link";
import { getCharacterById, getCharactersId, getWikiImg } from "@lib/ssg";
import type { Character } from "@lib/ssg";
import { NextPageWithLayout } from "@types";
import CharacterProperty from "@components/CharacterProperty";
import { useRouter } from "next/router";
import { parseForQuery } from "@lib/misc";
import css from "styled-jsx/css";

type ReturnTypeStaticProps = {
  character: Character & {
    image: string;
  };
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

  const image = await getWikiImg(character.wikiUrl);

  return {
    props: {
      character: {
        ...character,
        image,
      },
    },
  };
};

const { styles, className } = css.resolve`
  a {
    margin-top: 1rem;
    display: block;
    text-align: center;
    text-decoration: none;
    color: ${colors.lightblue};
    font-size: 0.9rem;
    transition: transform 0.2s;
  }

  a:hover {
    transform: scale(1.2);
  }
`;

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
          text-shadow:
            3px 0 black,
            -3px 0 black,
            0 -3px black,
            0 3px black;
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

        div.image-container {
          position: relative;
          width: 20rem;
          height: 20rem;
          max-width: 100%;
          margin: 1.5rem auto;
        }

        button {
          margin-top: 1rem;
          display: block;
          text-align: center;
          color: ${colors.lightblue};
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
      {styles}

      <h1>{character.name}</h1>
      {character.image && (
        <div className="image-container">
          <Image
            src={character.image}
            alt={character.name}
            layout="fill"
            objectFit="contain"
          />
        </div>
      )}
      <CharacterProperty label="Race" prop={character.race} />
      <CharacterProperty label="Gender" prop={character.gender} />
      <CharacterProperty label="Birth" prop={character.birth} />
      <CharacterProperty label="Spouse" prop={character.spouse} />
      <CharacterProperty label="Death" prop={character.death} />
      <CharacterProperty label="Realm" prop={character.realm} />
      <CharacterProperty label="Hair" prop={character.hair} />
      <CharacterProperty label="Height" prop={character.height} />
      <Link
        href={`/quotes?character=${parseForQuery(character.name)}`}
        className={className}
      >
        See quotes
      </Link>
      {character.wikiUrl && (
        <a href={character.wikiUrl} className={className}>
          Visit wikipedia
        </a>
      )}
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
