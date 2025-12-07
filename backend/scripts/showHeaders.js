const fs = require("fs");
const readline = require("readline");
const path = require("path");

const filePath = path.join(__dirname, "..", "src", "data", "sales.csv");

const stream = fs.createReadStream(filePath);
const rl = readline.createInterface({ input: stream });

rl.on("line", (line) => {
  const headers = line.split(",");
  console.log(headers);
  rl.close();  
  stream.destroy();
});

rl.on("close", () => {
  process.exit(0);
});
