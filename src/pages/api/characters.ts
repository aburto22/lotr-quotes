import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: unknown;
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
