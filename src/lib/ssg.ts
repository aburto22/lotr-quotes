import characters from "@data/characters.json";

export const getCharacters = async () => characters;

export const getCharacterById = async (id: string) =>
  characters.find((c) => c._id === id);
