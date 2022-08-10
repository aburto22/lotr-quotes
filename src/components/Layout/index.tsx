import { useEffect, useState } from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <style jsx global>{`
        body {
          background: url("/imgs/general_bg.jpeg");
          background-position: center;
          background-size: cover;
          background-attachment: fixed;
        }

        #__next {
          transition: opacity 1000ms;
          opacity: ${isMounted ? 1 : 0};
        }
      `}</style>

      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
