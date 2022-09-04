# @nelreina/rest-client

A simple rest client , abstraction of axios

## Migration from 1

### Version 1

```js
const jsonService = RestClient("https://jsonplaceholder.typicode.com");
```

### Version 2 is Class Based

```js
const jsonService = new RestClient("https://jsonplaceholder.typicode.com");
```

## Usage / Example

```javascript
import RestClient from "@nelreina/rest-client";
const jsonService = new RestClient("https://jsonplaceholder.typicode.com");
const anotherService = new RestClient("http://localhost:1234", "xml");

// Basic Authorization
const auth = { username: "", password: "" };
const authService = new RestClient("http://localhost:1234", null, auth);

// Call the api
try {
  // Get route
  const data = await jsonService.get("/todos/1");

  // POST route
  const data2 = await anotherService.post("/test", { message: "post me" });
} catch (error) {
  console.log(error.message);
}
```
