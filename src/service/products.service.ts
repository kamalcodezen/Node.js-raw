import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "./src/database/db.json"); //* file path system a database join kore connect korche......

export const productsService = () => {
  //*   console.log(process.cwd());
  //*  console.log(filePath);

  const result = fs.readFileSync(filePath, "utf-8"); //* fs file path a ke read korche stringify hisabe

  return JSON.parse(result);
};
