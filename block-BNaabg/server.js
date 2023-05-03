const http = require("http");
const fs = require("fs");
const url = require("url");

const port = 3000;
const host = "localhost";

const usersPath = __dirname + "/users/";

const server = http.createServer(handleRequest);

function handleRequest(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;
  let store = "";

  req.on("data", (chunk) => {
    store += chunk;
  });

  req.on("end", () => {
    if (method == "POST" && parsedUrl.pathname == "/users") {
      createUser(store, res);
    } else if (method == "GET" && parsedUrl.pathname == "/users") {
      readUser(res, parsedUrl);
    } else if (method == "PUT" && parsedUrl.pathname == "/users") {
      updateUser(store, res, parsedUrl);
    } else if (method == "DELETE" && parsedUrl.pathname == "/users") {
      deleteUser(res, parsedUrl);
    } else {
      res.writeHead(404);
      res.end("Page not found");
    }
  });
}

function createUser(store, res) {
  const username = JSON.parse(store).username;

  fs.open(usersPath + username + ".json", "wx", (err, fd) => {
    if (err) return console.log(err);
    fs.writeFile(fd, store, (err) => {
      if (err) console.log(err);

      fs.close(fd, () => {
        res.end(`${username} created successfully`);
      });
    });
  });
}

function readUser(res, parsedUrl) {
  const username = parsedUrl.query.username;

  fs.readFile(usersPath + username + ".json", (err, content) => {
    if (err) console.log(err);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(content);
  });
}

function updateUser(store, res, parsedUrl) {
  const username = parsedUrl.query.username;
  fs.open(usersPath + username + ".json", "r+", (err, fd) => {
    if (err) console.log(err);
    fs.ftruncate(fd, (err) => {
      if (err) console.log(err);

      fs.writeFile(fd, store, (err) => {
        if (err) console.log(err);

        fs.close(fd, () => {
          res.end(`${username} updated successfully`);
        });
      });
    });
  });
}

function deleteUser(res, parsedUrl) {
  const username = parsedUrl.query.username;

  fs.unlink(usersPath + username + ".json", (err) => {
    if (err) console.log(err);

    res.end(`${username} deleted successfully`);
  });
}

server.listen(port, host, () => {
  console.log("Server started on port 3000");
});
