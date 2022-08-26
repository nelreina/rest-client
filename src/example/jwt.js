import "dotenv/config";

import RestClient from "../index.js";
const JWT_API = process.env["JWT_API"];
const JWT_USERNAME = process.env["JWT_USERNAME"];
const JWT_PASSWORD = process.env["JWT_PASSWORD"];

if (!JWT_API) {
  console.error("JWT_API is not defined");
}

const credentials = {
  identifier: JWT_USERNAME,
  password: JWT_PASSWORD,
};

try {
  console.log("LOG:  ~ file: index.js ~ line 12 ~ JWT_API", JWT_API);
  const jwtService = RestClient(JWT_API);
  const resp = await jwtService.post("/auth/local", credentials);
  console.log("LOG:  ~ file: index.js ~ line 23 ~ jwt token", resp.jwt);
  const data = await jwtService.get("/thub-meta-configs", resp.jwt);
  console.log("LOG:  ~ file: index.js ~ line 26 ~ resp", data);
} catch (error) {
  console.error("ERROR:", error.message);
}
