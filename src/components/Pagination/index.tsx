import { colors } from "@styles/cssVariables";
import { scrollUp } from "@lib/misc";

interface PaginationProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  maxPage: number;
  page: number;
}

const Pagination = ({ setPage, maxPage, page }: PaginationProps) => {
  const handlePrevPage = () => {
    setPage((currentPage) => {
      if (currentPage <= 1) {
        return currentPage;
      }
      return currentPage - 1;
    });
    scrollUp();
  };

  const handleNextPage = () => {
    setPage((currentPage) => {
      if (currentPage >= maxPage) {
        return currentPage;
      }
      return currentPage + 1;
    });
    scrollUp();
  };

  const prevButtonDisabled = page <= 1;
  const nextButtonDisabled = page >= maxPage;

  return (
    <section className="pagination">
      <style jsx>{`
        section {
          display: flex;
          justify-content: center;
        }

        button {
          padding: 0.8rem 1rem;
          margin: 0.5rem 1rem;
          border: none;
          background-color: transparent;
          border-radius: 0.5rem;
          font-family: Anirom;
          font-size: 0.7rem;
          transition: transform 0.1s;
          cursor: pointer;
          box-shadow: 0 2px 5px ${colors.lightblue};
          color: ${colors.lightblue};
        }

        button:hover {
          transform: scale(1.1);
          background-color: ${colors.lightblue};
          color: ${colors.black};
        }

        button:disabled {
          cursor: default;
          transform: none;
          background-color: transparent;
          box-shadow: 0 2px 5px ${colors.blue};
          color: ${colors.blue};
        }
      `}</style>
      <button
        onClick={handlePrevPage}
        disabled={prevButtonDisabled}
        type="button"
      >
        Previous
      </button>
      <button
        onClick={handleNextPage}
        disabled={nextButtonDisabled}
        type="button"
      >
        Next
      </button>
    </section>
  );
};

export default Pagination;
