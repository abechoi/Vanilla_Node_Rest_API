<h1 align="center">
  How to Build a REST API with Vanilla Node
</h1>

## 1. Setup

```
npm init -y
npm i -D nodemon
```

package.json

```
# modify scripts
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
},
```

server.js

```
const http = require("http");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.write("<h1>Hello World</h1>");
  res.end();
});

// Check for environment variable OR 5000
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Listening to port:${PORT}`));
```

```
# run the server
npm run dev
```

## 2. Simple Routing

```
const server = http.createServer((req, res) => {
  // get products only with GET method and at "/api/products"
  if (req.url === "/api/products" && req.method === "GET") {
    // writeHead(arg1, arg2)
    // arg1 is a status code, arg2 is an object
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found!" }));
  }
});
```
