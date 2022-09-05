import "dotenv/config";

import { RestClient } from "../index.js";
const XML_API = process.env["XML_API"];

try {
  if (!XML_API) {
    throw new Error("XML_API is not defined");
  }
  const xmlService = new RestClient(XML_API, { mime: "xml" });
  const resp = await xmlService.post("/execute", {
    root: { ynhidn: "d731bd7e-f550-4013-97a8-4b51eb778e9b" },
  });
  console.log("LOG:  ~ file: index.js ~ line 23 ~ resp", resp);
} catch (error) {
  console.error("LOG:  ~ file: xml.js ~ line 17 ~ error", error.message);
}
