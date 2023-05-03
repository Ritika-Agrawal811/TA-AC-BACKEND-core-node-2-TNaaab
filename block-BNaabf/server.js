const http = require("http");
const port = 5678;
const host = "localhost";

const fs = require("fs");
const url = require("url");
const qs = require("querystring");

const server = http.createServer((req, res) => {
  let store = "";

  const parsedUrl = url.parse(req.url);
  const pathname = parsedUrl.pathname;

  req.on("data", (chunk) => {
    store += chunk;
  });

  req.on("end", () => {
    if (req.method == "GET" && pathname == "/form") {
      res.writeHead(200, { "Content-Type": "text/html" });
      fs.createReadStream("./form.html").pipe(res);
    }

    if (req.method == "POST" && pathname == "/form") {
      const data = qs.parse(store);
      console.log(data);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(`<h2>${data.username}</h2>`);
      res.write(`<p>${data.email}</p>`);
      res.write(`<p>${data.age}</p>`);
      res.end();
    }
  });
});

server.listen(port, host, () => {
  console.log("server started");
});
