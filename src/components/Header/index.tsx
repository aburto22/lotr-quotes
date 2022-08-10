import React from "react";
import Link from "next/link";
import { colors } from "@styles/cssVariables";

const Header = () => (
  <header>
    <style jsx>{`
      header {
        padding: 3rem 1rem 0;
        background-color: ${colors["transparent-blue"]};
        margin-bottom: 1rem;
      }

      header > a {
        text-decoration: none;
        text-align: center;
        margin-bottom: 0.5rem;
        color: ${colors.yellow};
        text-shadow: 3px 0 black, -3px 0 black, 0 -3px black, 0 3px black;
        font-size: 1.5rem;
        font-family: "Morris Roman", sans-serif;
        display: block;
      }

      nav {
        display: flex;
        width: 30rem;
        margin: auto;
        justify-content: center;
        max-width: 100%;
      }

      nav a {
        padding: 1rem;
        text-decoration: none;
        transition: transform 0.3s;
        color: ${colors.lightblue};
        font-size: 0.9rem;
        margin: 0 0.5rem;
      }

      nav a:hover {
        transform: scale(1.1);
        color: ${colors.lightblue};
      }

      @media screen and (min-width: 30rem) {
        header > a {
          font-size: 2.3rem;
        }

        nav a {
          font-size: 1.1rem;
        }
      }
    `}</style>

    <Link href="/home" passHref>
      <a href="dummy">
        <h1>The Lord of the Rings</h1>
      </a>
    </Link>
    <nav>
      <Link href="/characters" passHref>
        <a href="dummy">Characters</a>
      </Link>
      <Link href="/quotes" passHref>
        <a href="dummy">Quotes</a>
      </Link>
    </nav>
  </header>
);

export default Header;
