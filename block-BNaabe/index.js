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
