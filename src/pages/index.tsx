import React, { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { colors } from "@styles/cssVariables";

const Home: NextPage = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { push } = useRouter();

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setIsClicked(true);
    setTimeout(() => {
      push("/home");
    }, 500);
  };

  return (
    <main className={isClicked ? "welcome--clicked" : ""}>
      <style jsx>{`
        main {
          position: relative;
          max-width: 100%;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: black;
          transition: opacity 0.5s;
          opacity: ${isClicked ? 0 : 1};
        }

        div.backgroundImage {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: url("/imgs/general_bg.jpeg");
          background-position: center;
          background-size: cover;
          transition: opacity 0.5s;
          opacity: ${isHovered ? 0.5 : 1};
        }

        a {
          padding: 2rem;
          color: ${colors.yellow};
          font-size: 3rem;
          text-decoration: none;
          transition: transform 0.5s;
          text-align: center;
          z-index: 1;
          text-shadow: 3px 0 black, -3px 0 black, 0 -3px black, 0 3px black;
          display: inline-block;
        }

        a:hover {
          transform: scale(1.2);
        }
      `}</style>

      <div className="backgroundImage" />
      <Link href="/home" passHref>
        <a
          href="dummy"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
        >
          Enter website
        </a>
      </Link>
    </main>
  );
};

export default Home;
