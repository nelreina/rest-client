import "dotenv/config";

import RestClient from "../index.js";
const EXCHANGE_API = process.env["EXCHANGE_API"];
const EXCHANGE_API_KEY = process.env["EXCHANGE_API_KEY"];
console.log("LOG:  ~ file: json.js ~ line 5 ~ EXCHANGE_API", EXCHANGE_API);

const path = "/latest?symbols=EUR&base=USD";
try {
  if (!EXCHANGE_API) {
    throw new Error(
      "EXCHANGE_API is not defined. Please set it in your .env file"
    );
  }
  const headers = { apikey: EXCHANGE_API_KEY };
  const jsonService = new RestClient(EXCHANGE_API, { headers });
  let data = await jsonService.get(path);

  console.log("LOG:  ~ file: json.js ~ line 13 ~ data", data);
} catch (error) {
  console.error("ERROR: ~ file: index.js ~ line 27 ~ error", error.message);
}
