import "dotenv/config";

import { RestClient } from "../index.js";
const STRAPI_API = process.env["STRAPI_API"];
console.log("LOG:  ~ file: json.js ~ line 5 ~ STRAPI_API", STRAPI_API);

try {
  if (!STRAPI_API) {
    throw new Error(
      "STRAPI_API is not defined. Please set it in your .env file"
    );
  }
  const jsonService = new RestClient(STRAPI_API);
  let data = await jsonService.post("/costumers", {
    code: "12348",
    fullName: "John Doe",
  });
  console.log(
    "LOG:  ~ file: json.js ~ line 13 ~ data",
    JSON.stringify(data, null, 2)
  );
} catch (error) {
  console.error("ERROR: ~ file: index.js ~ line 27 ~ error", error.message);
}
