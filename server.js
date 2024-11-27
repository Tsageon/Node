const http = require("http");
const url = require("url");
const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
  const { method, url: requestUrl } = req;


  const parsedUrl = url.parse(requestUrl, true);
  const pathname = parsedUrl.pathname;

  res.setHeader("Content-Type", "application/json");

  if (method === "GET") {
    if (pathname === "/") {
      res.statusCode = 200;
      res.end(JSON.stringify({ message: "Welcome to the Home Page" }));
    } else if (pathname === "/about") {
      res.statusCode = 200;
      res.end(JSON.stringify({ message: "About Page" }));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Not Found" }));
    }
  }

  else if (method === "POST") {
    if (pathname === "/submit") {
      let body = "";
      req.on("data", chunk => {
        body += chunk;
      });
      req.on("end", () => {
        res.statusCode = 201;
        res.end(JSON.stringify({ message: "Data received", data: body }));
      });

    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Not Found" }));
    }
  }

  else if (method === "PUT") {
    if (pathname === "/update") {
      let body = "";
      req.on("data", chunk => {
        body += chunk;
      });

      req.on("end", () => {
        res.statusCode = 200;
        res.end(JSON.stringify({ message: "Data updated", data: body }));
      });
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Not Found" }));
    }
  }

  else if (method === "DELETE") {
    if (pathname === "/delete") {
      res.statusCode = 200;
      res.end(JSON.stringify({ message: "Data deleted" }));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Not Found" }));
    }
  }

  else {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: "Method Not Allowed" }));
  }
});

server.on("error", (err) => {
  console.error("Server Error: ", err);
  process.exit(1); 
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
