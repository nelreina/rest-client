import axios from "axios";
import { buildXML } from "@nelreina/xml-utils";

const continueCheckingValue = (data, field, values) => {
  let checkForNull = data[field] === undefined || data[field] === null;
  if (values === "any") {
    if (checkForNull) {
      return true;
    } else {
      return false;
    }
  }
  return !("" + values).includes("" + data[field]);
};

export default class RestClient {
  constructor(API, options = {}) {
    this.strapi = options.isStrapi || false;
    this.mime = options.mimetype || "json";
    this.base64 = options.base64 || false;
    this.strapiToken = options.jwt || "";
    this.api = API;
    this.headers = {
      "Content-Type": `application/${this.mime}`,
      Accept: `application/${this.mime}`,
      ...options.headers,
    };
    if (options.basicAuth) {
      if (this.base64) {
        let data = `${options.basicAuth.username}:${options.basicAuth.password}`;
        let base64data = Buffer.from(data).toString("base64");
        this.headers["Authorization"] = `Basic ${base64data}`;
      } else {
        this.headers.auth = options.basicAuth;
      }
    }

    this.client = axios.create(this.headers);
  }

  async request(
    path,
    method = "GET",
    optionalData = null,
    token = false,
    responseObject = false
  ) {
    const url = `${this.api}${path}`;
    const options = { method, url, headers: { ...this.headers } };

    if (this.strapi && token) {
      if (!this.strapiToken) {
        throw new Error(
          "No token provided! Please login first by calling strapiLogin."
        );
      }
      options.headers["Authorization"] = `Bearer ${this.strapiToken}`;
    } else {
      if (token) {
        options.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    if (optionalData) {
      let body = optionalData;
      switch (this.mime) {
        case "json":
          options.data = body;
          break;
        case "xml":
          body = await buildXML(optionalData);
          options.data = body;
          break;

        default:
          break;
      }
    }
    let badRequestData;
    let status;
    const response = await this.client(options).catch((err) => {
      // console.log(JSON.stringify(err, null, 2));
      status = err.response.status;
      switch (status) {
        case 400:
          badRequestData = err.response?.data;
          break;
        case 401:
          throw new Error("Unauthorized");
        case 404:
          throw new Error(`${err.config.url} not found`);
        default:
          throw new Error(
            JSON.stringify(
              `Response Code: ${err.response?.status} - ${JSON.stringify(
                err.response?.data
              )}`
            )
          );
      }
    });
    status = status ? status : response.status;

    if (status >= 200 && status < 210) {
      if (responseObject) {
        return response;
      }
      return response.data;
    } else if (status === 400) {
      return badRequestData;
    } else {
      throw Error(`Status ${status}`);
    }
  }

  async get(path, token, responseObject = false) {
    return await this.request(path, "GET", null, token, responseObject);
  }

  async post(path, data, token, responseObject = false) {
    return await this.request(path, "POST", data, token, responseObject);
  }
  async put(path, data, token, responseObject = false) {
    return await this.request(path, "PUT", data, token, responseObject);
  }

  async delete(path, token) {
    return await this.request(path, "DELETE", null, token);
  }

  async strapiLogin(identifier, password, onlyToken = false) {
    try {
      const user = await this.post("/auth/local", { identifier, password });
      this.strapiToken = user.jwt;
      if (onlyToken) {
        return user.jwt;
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  pollForValue = (path, field, options = {}, token = false) =>
    new Promise((resolve, reject) => {
      let count_attempts = 1;
      const max_attempts = options?.max_attempts || 60;
      const interval = (options?.interval || 0.5) * 1000;
      const returnAll = options?.returnAll || false;
      const setLoading = options?.setLoading || function () {};
      const values = options?.values || "any";
      const pollInterval = setInterval(async () => {
        try {
          setLoading(true);
          const data = await this.get(path, token);
          if (Array.isArray(data)) {
            throw new Error(
              "Response data is an array. Array is not supported."
            );
          }
          if (typeof data !== "object") {
            throw new Error("Response data is not an object.");
          }

          if (
            continueCheckingValue(data, field, values) &&
            count_attempts < max_attempts
          ) {
            // Continue polling
            ++count_attempts;
          } else {
            if (count_attempts === max_attempts) {
              setLoading(false);
              clearInterval(pollInterval);
              throw new Error("Max attempts is reached !");
            } else {
              resolve(returnAll ? data : data[field]);
              setLoading(false);
              clearInterval(pollInterval);
            }
          }
        } catch (error) {
          clearInterval(pollInterval);
          setLoading(false);
          return reject(error);
        }
      }, interval);
    });
}
