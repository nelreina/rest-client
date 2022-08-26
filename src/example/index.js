import "dotenv/config";

import RestClient from "../index.js";
const JSON_API = process.env["JSON_API"];

if (!JSON_API) {
  console.error("JSON_API is not defined");
}
try {
  console.log("LOG:  ~ file: index.js ~ line 12 ~ JSON_API", JSON_API);
  const jsonService = RestClient(JSON_API);

  let data = await jsonService.get("/todos/1");
  console.log("LOG:  ~ file: JSON_API ~ line 12 ~ data", JSON.stringify(data));
} catch (error) {
  console.error("ERROR: ~ file: index.js ~ line 27 ~ error", error);
}
