import { useEffect, useState } from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { readFromStorage } from "@lib/storage";
import { useAppDispatch } from "@hooks/redux";
import { setFavourites } from "@slices/favourites";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsMounted(true);
    const favourites = readFromStorage();
    dispatch(setFavourites(favourites));
  }, [dispatch]);

  return (
    <>
      <style jsx global>{`
        body {
          background-color: black;
        }

        #__next {
          transition: opacity 1000ms;
          opacity: ${isMounted ? 1 : 0};
          background: url("/imgs/general_bg_transparent.png");
          background-position: center;
          background-size: cover;
          background-attachment: fixed;
        }
      `}</style>

      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
