<h1 align="center">
  How to Build a Vanilla NodeJS Server
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
