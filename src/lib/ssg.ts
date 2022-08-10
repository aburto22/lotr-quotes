import characters from "@data/characters.json";
import quotes from "@data/quotes.json";

export const getCharacters = async () => characters;

export const getCharactersId = async () => characters.map((c) => c._id);

export const getCharacterById = async (id: string) =>
  characters.find((c) => c._id === id);

export const getQuotes = async () => quotes;

export type Quote = typeof quotes[0];
export type Character = typeof characters[0];
