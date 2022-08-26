import axios from "axios";
import { buildXML } from "@nelreina/xml-utils";

export default (API, mime = "json") => {
  const request = async (
    path,
    method = "GET",
    optionalData = null,
    token = null
  ) => {
    const url = `${API}${path}`;
    const options = {
      method,
      url,
      headers: {
        "Content-Type": `application/${mime}`,
        Accept: `application/${mime}`,
      },
    };

    if (token) {
      options.headers["Authorization"] = `Bearer ${token}`;
    }

    if (optionalData) {
      let body = optionalData;
      switch (mime) {
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
    const { status, data } = await axios(options).catch((err) => {
      switch (err.response?.status) {
        case 400:
          badRequestData = err.response?.data;
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

    if (status >= 200 && status < 210) {
      return data;
    } else if (status === 400) {
      return badRequestData;
    } else {
      throw Error(`Status ${status}`);
    }
  };

  const get = async (path, token) => await request(path, "GET", null, token);
  const post = async (path, data, token) =>
    await request(path, "POST", data, token);
  const put = async (path, data, token) =>
    await request(path, "PUT", data, token);

  const pollForValue = (path, field, options) =>
    new Promise((resolve, reject) => {
      let count_attempts = 1;
      const max_attempts = options?.max_attempts || 60;
      const interval = (options?.interval || 0.5) * 1000;
      const returnAll = options?.returnAll || false;
      const setLoading = options?.setLoading || function () {};

      const pollInterval = setInterval(async () => {
        try {
          setLoading(true);
          const data = await get(path);
          if (data[field] === null && count_attempts < max_attempts) {
            // Continue polling
            ++count_attempts;
          } else {
            if (count_attempts === max_attempts) {
              setLoading(false);
              clearInterval(pollInterval);
              return reject("Took to long for a response!");
            } else {
              resolve(returnAll ? data : data[field]);
              setLoading(false);
              clearInterval(pollInterval);
            }
          }
        } catch (error) {
          clearInterval(pollInterval);
          setLoading(false);
          return reject(error.message);
        }
      }, interval);
    });

  return { request, get, post, put, pollForValue };
};
