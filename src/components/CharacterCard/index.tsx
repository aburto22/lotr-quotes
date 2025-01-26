import React from "react";
import Link from "next/link";
import { colors } from "@styles/cssVariables";
import { ICharacter } from "@types";
import css from "styled-jsx/css";

const { styles, className } = css.resolve`
  a {
    display: block;
    text-decoration: none;
    color: var(--lightblue);
    text-align: center;
    font-size: 0.7rem;
  }

  a:after {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

interface CharacterCardProps {
  character: Pick<ICharacter, "_id" | "name"> &
    Partial<Omit<ICharacter, "race">> & { race: string | null };
}

const CharacterCard = ({ character }: CharacterCardProps) => (
  <article>
    <style jsx>{`
      article {
        padding: 1rem;
        margin: 0.5rem;
        transition: transform 0.2s;
        position: relative;
        opacity: 0.8;
        width: 8rem;
        overflow-wrap: break-word;
      }

      article:hover {
        transform: scale(1.1);
        opacity: 1;
      }

      h2 {
        color: ${colors.yellow};
        text-shadow:
          3px 0 black,
          -3px 0 black,
          0 -3px black,
          0 3px black;
        font-size: 0.9rem;
        text-align: center;
      }

      p {
        font-size: 0.8rem;
        text-align: center;
      }

      @media screen and (min-width: 30rem) {
        h2 {
          font-size: 1.1rem;
        }

        article {
          width: 12rem;
        }
      }
    `}</style>
    {styles}

    <h2>{character.name}</h2>
    {character.gender && character.gender !== "NaN" && (
      <p>{character.gender}</p>
    )}
    {character.race && character.race !== "NaN" && <p>{character.race}</p>}
    <Link href={`/characters/${character._id}`} className={className}>
      more...
    </Link>
  </article>
);

export default CharacterCard;
