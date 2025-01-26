import Link from "next/link";
import { IQuote } from "@types";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { toggleFavourite } from "@slices/favourites";
import { colors } from "@styles/cssVariables";
import HearthIcon from "@components/HearthIcon";
import css from "styled-jsx/css";

const { className, styles } = css.resolve`
  a {
    display: block;
    text-decoration: none;
    color: ${colors.lightblue};
    text-align: center;
    font-size: 0.7rem;
  }
`;

interface QuoteCardProps {
  quote: IQuote;
}

const QuoteCard = ({ quote }: QuoteCardProps) => {
  const dispatch = useAppDispatch();
  const isFavourite = useAppSelector((state) =>
    state.favourites.includes(quote._id),
  );

  const handleClick = () => {
    dispatch(toggleFavourite(quote._id));
  };

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
          text-shadow:
            3px 0 black,
            -3px 0 black,
            0 -3px black,
            0 3px black;
          font-size: 1.1rem;
          text-align: center;
        }

        p {
          font-size: 0.8rem;
          text-align: center;
        }

        button {
          background-color: transparent;
          border: none;
          cursor: pointer;
        }
      `}</style>
      {styles}

      <div>
        <h2>{quote.dialog}</h2>
        <p>{quote.characterName}</p>
        <Link href={`/characters/${quote.character}`} className={className}>
          character info...
        </Link>
      </div>
      <button type="button" onClick={handleClick} aria-label="toggle favourite">
        <HearthIcon isFavourite={isFavourite} />
      </button>
    </article>
  );
};

export default QuoteCard;
