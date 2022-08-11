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

export const getQueryFromUrl = (path: string, key: string): string | null => {
  const match = path.match(/\?.+$/);

  if (!match) {
    return null;
  }

  const params = new URLSearchParams(match[0]);

  return params.get(key);
};
