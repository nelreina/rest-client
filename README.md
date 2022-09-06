# @nelreina/rest-client

A simple rest client , abstraction of axios

## Migration from 1

### Version 1

```js
const jsonService = RestClient("https://jsonplaceholder.typicode.com");
```

### Version 2 is Class Based

```js
const options = {};
const jsonService = new RestClient(
  "https://jsonplaceholder.typicode.com",
  options
);
```

## Usage / Example

```javascript
import { RestClient } from "@nelreina/rest-client";
const jsonService = new RestClient("https://jsonplaceholder.typicode.com");
const xmlService = new RestClient("http://localhost:1234", { mimetype: "xml" });

// Basic Authorization
const basicAuth = { username: "", password: "" };
const authService = new RestClient("http://localhost:1234", { basicAuth });

// Call the api
try {
  // Get route
  const data = await jsonService.get("/todos/1");

  // POST route
  const data2 = await xmlService.post("/test", { message: "post me" });
} catch (error) {
  console.log(error.message);
}
```

## Options

| field     | default | value                            |
| --------- | ------- | -------------------------------- |
| mimetype  | json    | 'xml' or 'json'                  |
| basicAuth | null    | {'username': '', 'password': ''} |
