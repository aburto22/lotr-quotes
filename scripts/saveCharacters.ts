import axios from "axios";
import fs from "fs/promises";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

axios({
  method: "get",
  url: "https://the-one-api.dev/v2/character?limit=5000",
  headers: {
    Authorization: `Bearer ${process.env.LOTR_KEY}`,
  },
}).then(async (res) => {
  const characters = res.data.docs;

  try {
    const dirpath = path.join(__dirname, "..", "data");
    await fs.mkdir(dirpath);
  } catch (err: any) {
    if (err?.code === "EEXIST") {
      return;
    }
    console.error(err);
  } finally {
    const fileName = path.join(__dirname, "..", "data", "characters.json");

    await fs.writeFile(fileName, JSON.stringify(characters));

    console.log("Characters have been saved");
  }
});
