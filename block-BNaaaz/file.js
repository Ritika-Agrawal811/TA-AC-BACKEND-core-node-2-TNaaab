const http = require("http");
const fs = require("fs");

const host = "localhost";
const port = 8000;

const server = http.createServer((req, res) => {
  fs.createReadStream("./readme.txt").pipe(res);
});

server.listen(port, host, () => {
  console.log("sever started");
});
