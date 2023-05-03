const http = require("http");
const qs = require("querystring");
const port = 7000;
const host = "localhost";

const server = http.createServer((req, res) => {
  const dataFormat = req.headers["content-type"];
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
