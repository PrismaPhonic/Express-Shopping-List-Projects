const fs = require("fs");
const process = require("process");
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

async function write(data, output) {
  return writeFilePromise(output, data, "utf8");
}

function read(path) {
  return readFilePromise(path, "utf8");
}

module.exports = {
  write,
  read,
}
