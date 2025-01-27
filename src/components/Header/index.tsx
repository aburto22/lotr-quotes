import { useState } from "react";
import Link from "next/link";
import { colors } from "@styles/cssVariables";
import css from "styled-jsx/css";

const { className: classNameNavLink, styles: stylesNavLink } = css.resolve`
  a {
    padding: 1rem;
    text-decoration: none;
    transition: transform 0.3s;
    color: ${colors.lightblue};
    font-size: 0.9rem;
    margin: 0 0.5rem;
  }

  a:hover {
    transform: scale(1.1);
    color: ${colors.lightblue};
  }

  @media screen and (min-width: 30rem) {
    a {
      font-size: 1.1rem;
    }
  }
`;

const { className: classNameHeaderLink, styles: stylesHeaderLink } =
  css.resolve`
    a {
      text-decoration: none;
      text-align: center;
      margin-bottom: 0.5rem;
      color: ${colors.yellow};
      text-shadow:
        3px 0 black,
        -3px 0 black,
        0 -3px black,
        0 3px black;
      font-size: 1.5rem;
      font-family: "Morris Roman", sans-serif;
      display: block;
    }

    @media screen and (min-width: 30rem) {
      a {
        font-size: 2.3rem;
      }
    }
  `;

const Header = () => {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <header>
      <style jsx>{`
        header {
          padding: 1rem 1rem 0;
          background-color: ${colors["transparent-blue"]};
          margin-bottom: 1rem;
          display: flex;
        }

        h1.laptop-screen {
          display: none;
        }

        button {
          margin-left: auto;
          background-color: transparent;
          color: ${colors.yellow};
          border: none;
          padding: 0.5rem;
          z-index: 2;
        }

        svg {
          height: 2.5rem;
          width: 2.5rem;
        }

        nav {
          display: flex;
          flex-direction: column;
          position: fixed;
          justify-content: center;
          align-items: center;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          margin: auto;
          max-width: 100%;
          background-color: ${colors.black};
          z-index: 1;
          transform: ${isShowing ? "translateX(0)" : "translateX(100%)"};
          transition: transform 300ms;
        }

        @media screen and (min-width: 30rem) {
          header {
            padding-top: 1rem;
            flex-direction: column;
          }

          h1.laptop-screen {
            display: block;
          }

          h1.mobile-screen {
            display: none;
          }

          button {
            display: none;
          }

          nav {
            width: 30rem;
            margin: auto;
            background-color: transparent;
            position: static;
            top: unset;
            left: unset;
            height: auto;
            flex-direction: row;
            transform: translateX(0);
          }
        }
      `}</style>
      {stylesNavLink}
      {stylesHeaderLink}

      <Link href="/home" className={classNameHeaderLink}>
        <h1 className="laptop-screen">The Lord of the Rings</h1>
        <h1 className="mobile-screen">LOTR</h1>
      </Link>
      <button type="button" onClick={() => setIsShowing((st) => !st)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {isShowing ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>
      <nav>
        <Link
          href="/characters"
          onClick={() => setIsShowing(false)}
          className={classNameNavLink}
        >
          Characters
        </Link>
        <Link
          href="/quotes"
          passHref
          onClick={() => setIsShowing(false)}
          className={classNameNavLink}
        >
          Quotes
        </Link>
        <Link
          href="/favourites"
          passHref
          onClick={() => setIsShowing(false)}
          className={classNameNavLink}
        >
          Favourites
        </Link>
      </nav>
    </header>
  );
};

export default Header;
