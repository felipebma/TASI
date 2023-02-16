const dgram = require("dgram");
const socket = dgram.createSocket("udp4");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

socket.on("message", (msg, rinfo) => {
  console.log(`SERVER: ${msg}`);
});

rl.addListener("line", (line) => {
  socket.send(Buffer.from(line), 8081, "localhost");
});
