const net = require("net");
const readline = require("readline");

const client = net.Socket();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

client.connect(4000, () => {
  rl.addListener("line", (line) => {
    client.write(line);
  });
  client.on("data", (data) => {
    console.log(`${data.toString()}`);
  });
});
