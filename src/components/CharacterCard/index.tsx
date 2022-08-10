import React from "react";
import Link from "next/link";
import { colors } from "@styles/cssVariables";
import { ICharacter } from "@types";

interface CharacterCardProps {
  character: Partial<ICharacter> & Pick<ICharacter, "_id" | "name">;
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
        width: 9rem;
        overflow-wrap: break-word;
      }

      article:hover {
        transform: scale(1.1);
        opacity: 1;
      }

      h2 {
        color: ${colors.yellow};
        text-shadow: 3px 0 black, -3px 0 black, 0 -3px black, 0 3px black;
        font-size: 1.1rem;
        text-align: center;
      }

      p {
        font-size: 0.8rem;
        text-align: center;
      }

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

      @media screen and (min-width: 30rem) {
        article {
          width: 12rem;
        }
      }
    `}</style>

    <h2>{character.name}</h2>
    {character.gender && character.gender !== "NaN" && (
      <p>{character.gender}</p>
    )}
    {character.race && character.race !== "NaN" && <p>{character.race}</p>}
    <Link href={`/characters/${character._id}`} passHref>
      <a href="dummy">more...</a>
    </Link>
  </article>
);

export default CharacterCard;
