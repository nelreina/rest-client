import "dotenv/config";

import RestClient from "../index.js";
const EXAMPLE_API = process.env["EXAMPLE_API"];

const jsonService = RestClient(EXAMPLE_API);

const data = await jsonService.get("/todos/1");
console.log("LOG:  ~ file: index.js ~ line 12 ~ data", JSON.stringify(data));
