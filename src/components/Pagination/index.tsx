import { useRouter } from "next/router";
import { colors } from "@styles/cssVariables";
import { scrollUp } from "@lib/misc";
import { getQueryParams } from "@lib/query";

interface State {
  page: number;
  [key: string]: string | number;
}

interface PaginationProps<T> {
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
  maxPage: number;
  path: string;
}

const Pagination = <T extends State>({
  state,
  setState,
  maxPage,
  path,
}: PaginationProps<T>) => {
  const { push } = useRouter();

  const handlePrevPage = () => {
    const newPage = state.page <= 1 ? 1 : state.page - 1;
    const newState = {
      ...state,
      page: newPage,
    };
    setState(newState);
    const query = getQueryParams(newState);

    push(path, { query }, { shallow: true });
    scrollUp();
  };

  const handleNextPage = () => {
    const newPage = state.page >= maxPage ? maxPage : state.page + 1;
    const newState = {
      ...state,
      page: newPage,
    };
    setState(newState);
    const query = getQueryParams(newState);

    push(path, { query }, { shallow: true });
    scrollUp();
  };

  const prevButtonDisabled = state.page <= 1;
  const nextButtonDisabled = state.page >= maxPage;

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
