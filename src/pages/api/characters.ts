import type { NextApiRequest, NextApiResponse } from "next";
import type { ICharacter } from "@types";

type Data = {
  data: any;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const response = await fetch("https://the-one-api.dev/v2/character", {
    headers: {
      Authorization: `Bearer ${process.env.LOTR_KEY}`,
    },
  });
  const data = await response.json();
  res.status(200).json({ data });
};

export default handler;
