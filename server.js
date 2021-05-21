const http = require("http");
const products = require("./data/products");

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

// Check for environment variable OR 5000
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Listening to port:${PORT}`));
