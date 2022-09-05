import "dotenv/config";

import { RestClient } from "../index.js";
const JWT_API = process.env["JWT_API"];
const JWT_USERNAME = process.env["JWT_USERNAME"];
const JWT_PASSWORD = process.env["JWT_PASSWORD"];

if (!JWT_API) {
  console.error("JWT_API is not defined");
}

try {
  console.log("LOG:  ~ file: index.js ~ line 12 ~ JWT_API", JWT_API);
  const jwtService = new RestClient(JWT_API, { isStrapi: true });
  const jwt = await jwtService.strapiLogin(JWT_USERNAME, JWT_PASSWORD);
  console.log("LOG:  ~ file: index.js ~ line 23 ~ jwt token", jwt);
  const data = await jwtService.get("/costumers", true);
  console.log("LOG:  ~ file: strapi-login.js ~ line 18 ~ data", data);
} catch (error) {
  console.error("ERROR:", error.message);
}
