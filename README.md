# @nelreina/rest-client

A simple rest client , abstraction of axios

## Usage / Example

```javascript
const RestClient = require "@nelreina/rest-client-commonjs";
const jsonService = RestClient("https://jsonplaceholder.typicode.com");
const anotherService = RestClient("http://localhost:1234");

async () => {
  const data = await jsonService.get("/todos/1");

  const data2 = await anotherService.post("/test", { message: "post me" });

}();
```
