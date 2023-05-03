## BLOCK-writeCode

#### Path

Q. Suppose we have 3 files inside a directory on desktop
The structure is

- node(folder) - app.js - server.js - index.html
  You are currently inside server.js

Write code to

- capture absolute path of `server.js`(itself)
- get absolute path of `app.js`
- get realtive path of `index.html`
- get absolute path of `index.html` using `path module`

```js
console.log(__filename);
console.log(__dirname + "/app.js");
console.log("./index.html");

const path = require("path");

const relativePath = path.join(__dirname, "index.html");
```

#### Capture data on server

Q. Create a server using http

- handle post method on '/' route
- send json data on it from postman

```js
// data format is
{
  team: 'kxip',
  players: 18,
  captain: 'KL Rahul'
}
```

- capture data from request on server side using data and end event on request object
- when end event fires, send entire captured data in response with status code 201.

```js

const http = require("http");
const port = 8000;
const host = "localhost";

const server = http.createServer((req, res) => {
  let store = "";

  req.on("data", (chunk) => {
    store += chunk;
  })

  req.on("end", () => {
    if(req.method == 'POST' and req.url == "/") {
      res.writeHead(201);
      res.end(store);
    }
  })

})

server.listen(port, host, () => {
  console.log("server started");
})

```

Q. Follow above steps with form data from postman instead of json data.

- once data has been captured, send only captain's name in response.

```js
const http = require("http");
const qs = require("querystring");
const port = 8000;
const host = "localhost";

const server = http.createServer((req, res) => {
  const dataFormat = req.headers["content-type"];
  let store = "";

  req.on("data", (chunk) => {
    store += chunk;
  });

  req.on("end", () => {
    if (dataFormat == "application/json") {
      res.writeHead(201);
      res.end(store);
    } else if (dataFormat == "application/x-www-form-urlencoded") {
      const parsedData = qs.parse(store);
      res.writeHead(201);
      res.end(parsedData.captain);
    }
  });
});

server.listen(port, host, () => {
  console.log("server started");
});
```

Q. Create server which can handle both json/form data without specifying which format of data is being received.

- add listener on port 9000
- use `data/end` event to capture json/form data
- use `req.headers['Content-Type']` to check data format
- parse respective data format i.e. json/form
- send entire data in response
- data sent from postman should have fields:

  - city
  - state
  - country
  - pin

  ```js
  const http = require("http");
  const qs = require("querystring");
  const port = 9000;
  const host = "localhost";

  const server = http.createServer((req, res) => {
    const dataFornmat = req.headers["content-type"];
    let store = "";

    req.on("data", (chunk) => {
      store += chunk;
    });

    req.on("end", () => {
      if (dataFormat == "application/json") {
        res.end(store);
      } else if (dataFormat == "application/x-www-form-urlencoded") {
        const parsedData = qs.parse(store);
        res.end(JSON.stringify(parsedData));
      }
    });
  });

  server.listen(port, host, () => {
    console.log("server started");
  });
  ```

Q. create server, send json data in request from postman, parse in on the server and send html response with entire parsed data information.

- format of json data is {name: your name, email: "", }
- Html response format is <h1>Name</h1><h2>email</h2>

```js
const http = require("http");

const server2 = http.createServer((req, res) => {
  const dataFormat = req.headers["content-type"];
  let store = "";

  req.on("data", (chunk) => {
    store += chunk;
  });

  req.on("end", () => {
    if (dataFormat == "application/json") {
      const data = JSON.parse(store);
      res.writeHead(200, { "Content-Type": "text/html" });

      res.end(`<h1>${data.name}</h1><h2>${data.email}</h2>`);
    }
  });
});

server2.listen(8080, "localhost", () => {
  console.log("server started on port: 8080");
});
```

Q. Follow above question with form data containing fields i.e name and email.

- Parse form-data using `querystring` module
- respond with HTML page containing only email from data in H2 tag.

```js
const http = require("http");
const qs = require("querystring");

const server2 = http.createServer((req, res) => {
  const dataFormat = req.headers["content-type"];
  let store = "";

  req.on("data", (chunk) => {
    store += chunk;
  });

  req.on("end", () => {
    if (dataFormat == "application/json") {
      const data = JSON.parse(store);
      res.writeHead(200, { "Content-Type": "text/html" });

      res.end(`<h1>${data.name}</h1><h2>${data.email}</h2>`);
    } else if (dataFormat == "application/x-www-form-urlencoded") {
      const data = qs.parse(store);
      res.writeHead(200, { "Content-Type": "text/html" });

      res.end(`<h2>${data.email}</h2>`);
    }
  });
});

server2.listen(8080, "localhost", () => {
  console.log("server started on port: 8080");
});
```

#### Note:-

Make sure to convert objects into strings using `JSON.stringify` before passing the data through response.
