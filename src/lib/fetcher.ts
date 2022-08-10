export const fetcher = <T>(url: string): Promise<T> =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json.data.docs;
    });
