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
