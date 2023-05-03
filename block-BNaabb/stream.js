const http = require("http");
const port = 3456;
const host = "localhost";

const server = http.createServer((req, res) => {
  let store = "";

  req.on("data", (chunk) => {
    store += chunk;
  });

  req.on("end", () => {
    res.write(store);
    res.end();
  });
});

server.listen(port, host, () => {
  console.log("server started");
});
