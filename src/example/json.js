import "dotenv/config";

import RestClient from "../index.js";
const JSON_API = process.env["JSON_API"];
console.log("LOG:  ~ file: json.js ~ line 5 ~ JSON_API", JSON_API);

try {
  if (!JSON_API) {
    throw new Error("JSON_API is not defined. Please set it in your .env file");
  }
  const jsonService = new RestClient(JSON_API);
  let data = await jsonService.get("/todos/1");
  console.log("LOG:  ~ file: json.js ~ line 13 ~ data", JSON.stringify(data));
} catch (error) {
  console.error("ERROR: ~ file: index.js ~ line 27 ~ error", error.message);
}
