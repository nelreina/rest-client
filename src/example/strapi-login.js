import "dotenv/config";

import { RestClient } from "../index.js";
const STRAPI_API = process.env["STRAPI_API"];
const JWT_USERNAME = process.env["JWT_USERNAME"];
const JWT_PASSWORD = process.env["JWT_PASSWORD"];

if (!STRAPI_API) {
  console.error("STRAPI_API is not defined");
}

try {
  console.log("LOG:  ~ file: index.js ~ line 12 ~ STRAPI_API", STRAPI_API);
  const jwtService = new RestClient(STRAPI_API, { isStrapi: true });
  const jwt = await jwtService.strapiLogin(JWT_USERNAME, JWT_PASSWORD);
  console.log("LOG:  ~ file: index.js ~ line 23 ~ jwt token", jwt);
  const data = await jwtService.get("/costumers", true);
  console.log("LOG:  ~ file: strapi-login.js ~ line 18 ~ data", data);
} catch (error) {
  console.error("ERROR:", error.message);
}
