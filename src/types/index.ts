import type { NextPage } from "next";
import React from "react";

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

export interface ICharacter {
  height: string;
  race: string;
  gender: string;
  birth: string;
  spouse: string;
  death: string;
  realm: string;
  hair: string;
  name: string;
  wikiUrl: string;
  _id: string;
}

export interface IQuote {
  dialog: string | null;
  movie?: string;
  character: string;
  _id: string;
  characterName: string;
}

export enum Races {
  Human = "human",
  Elf = "elf",
  Hobbit = "hobbit",
  "Half-elven" = "half-elven",
  Dwarf = "dwarf",
  "Orc / Goblin" = "orc",
  Dragon = "dragon",
  Eagle = "eagle",
  Spider = "spider",
}
