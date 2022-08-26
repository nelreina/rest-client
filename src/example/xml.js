import "dotenv/config";

import RestClient from "../index.js";
const XML_API = process.env["XML_API"];

if (!XML_API) {
  console.error("XML_API is not defined");
}
try {
  console.log("LOG:  ~ file: index.js ~ line 12 ~ XML_API", XML_API);
  const xmlService = RestClient(XML_API, "xml");
  const resp = await xmlService.post("/execute", {
    root: { ynhidn: "d731bd7e-f550-4013-97a8-4b51eb778e9b" },
  });
  console.log("LOG:  ~ file: index.js ~ line 23 ~ resp", resp);
} catch (error) {
  console.error("ERROR: ~ file: index.js ~ line 27 ~ error", error);
}
