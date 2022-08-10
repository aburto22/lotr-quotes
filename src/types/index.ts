import type { NextPage } from "next";
import React from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
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
  dialog: string;
  movie: string;
  character: string;
  id: string;
  characterName: string;
}
