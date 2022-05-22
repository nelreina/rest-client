import "dotenv/config";

import RestClient from "../index.js";
const EXAMPLE_API = process.env["EXAMPLE_API"];

const jsonService = RestClient(EXAMPLE_API);

let data = await jsonService.get("/todos/1");
console.log("LOG:  ~ file: index.js ~ line 12 ~ data", JSON.stringify(data));

data = await jsonService.pollForValue("/todos/1", "title");
console.log("LOG:  ~ file: index.js ~ line 12 ~ data", JSON.stringify(data));
