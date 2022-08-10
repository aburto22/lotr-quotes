import characters from "@data/characters.json";
import quotes from "@data/quotes.json";
import { JSDOM } from "jsdom";

export const getCharacters = async () =>
  characters.map((c) => ({
    _id: c._id,
    name: c.name,
    gender: c.gender || null,
    race: c.race,
  }));

export const getCharactersId = async () => characters.map((c) => c._id);

export const getCharacterById = async (id: string) =>
  characters.find((c) => c._id === id);

export const getQuotes = async () => quotes;

export const getWikiImg = async (url: string | undefined) => {
  if (!url) {
    return "";
  }

  const res = await fetch(url);
  const html = await res.text();
  const dom = new JSDOM(html);

  const image: HTMLImageElement | null = dom.window.document.querySelector(
    "img.pi-image-thumbnail"
  );

  return image?.src || "";
};

export type Quote = typeof quotes[0];
export type Character = typeof characters[0];
