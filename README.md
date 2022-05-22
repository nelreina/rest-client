# @nelreina/rest-client

A simple rest client , abstraction of axios

## Usage / Example

```javascript
import RestClient from "@nelreina/rest-client";
const jsonService = await RestClient("https://jsonplaceholder.typicode.com");
const anotherService = await RestClient("http://localhost:1234");

const data = await jsonService.get("/todos/1");

const data2 = await anotherService.post("/test", { message: "post me" });
```
