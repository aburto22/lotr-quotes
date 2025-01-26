export const readFromStorage = () => {
  if (typeof window === "undefined") {
    return [];
  }
  const favouritesSaved = localStorage.getItem("favourites");

  if (!favouritesSaved) {
    return [];
  }

  try {
    const favourites: string[] = JSON.parse(favouritesSaved);
    return favourites;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const saveToStorage = (favourites: string[]) => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem("favourites", JSON.stringify(favourites));
};
