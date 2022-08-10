import React from "react";
import Link from "next/link";
import { IQuote } from "@types";
import { colors } from "@styles/cssVariables";

interface QuoteCardProps {
  quote: IQuote;
}

const QuoteCard = ({ quote }: QuoteCardProps) => {
  return (
    <article>
      <style jsx>{`
        article {
          padding: 0.5rem 1rem;
          margin: 0.5rem;
          max-width: 100%;
          width: max(40%, 20rem);
          transition: transform 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        article:hover {
          transform: scale(1.1);
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
          color: ${colors.lightblue};
          text-align: center;
          font-size: 0.7rem;
        }

        button {
          background-color: transparent;
          border: none;
          cursor: pointer;
        }
      `}</style>

      <div>
        <h2>{quote.dialog}</h2>
        <p>{quote.characterName}</p>
        <Link href={`/characters/${quote.character}`} passHref>
          <a href="dummy">character info...</a>
        </Link>
      </div>
    </article>
  );
};

export default QuoteCard;
