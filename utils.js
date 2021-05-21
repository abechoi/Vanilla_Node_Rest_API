const fs = require("fs");

const writeDataToFile = (filename, content) => {
  // convert content to a string and overwrite file
  fs.writeFileSync(filename, JSON.stringify(content), "utf8", (err) => {
    if (err) {
      console.log(err);
    }
  });
};

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    try {
      // 1. create empty body
      let body = "";
      // 2. on data, convert chunk to string and add to body
      // 3. on end, resolve body
      req
        .on("data", (chunk) => {
          body += chunk.toString();
        })
        .on("end", () => {
          resolve(body);
        });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  writeDataToFile,
  getPostData,
};
