import axios from "axios";
import fs from "fs/promises";
import dotenv from "dotenv";
import path from "path";
import characters from "../data/characters.json";

dotenv.config();

axios({
  method: "get",
  url: "https://the-one-api.dev/v2/quote?limit=5000",
  headers: {
    Authorization: `Bearer ${process.env.LOTR_KEY}`,
  },
}).then(async (res) => {
  let quotes = res.data.docs;

  if (!characters) {
    throw new Error("You should first fetch characters");
  }

  quotes = quotes.map((q: any) => ({
    ...q,
    characterName: characters.find((c) => c._id === q.character)?.name,
  }));

  try {
    const dirpath = path.join(__dirname, "..", "data");
    await fs.mkdir(dirpath);
  } catch (err: any) {
    if (err?.code === "EEXIST") {
      return;
    }

    console.error(err);
  } finally {
    const fileName = path.join(__dirname, "..", "data", "quotes.json");

    await fs.writeFile(fileName, JSON.stringify(quotes));

    console.log("Quotes have been saved");
  }
});
