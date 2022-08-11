interface State {
  [key: string]: string | number;
}

export const getQueryParams = <T extends State>(state: T): Partial<T> => {
  const query: Partial<T> = { ...state };
  Object.entries(state).forEach(([key, val]) => {
    if (!val) {
      delete query[key];
    }
    if (typeof val === "number" && val <= 1) {
      delete query[key];
    }
  });
  return query;
};
