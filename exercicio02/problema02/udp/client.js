const dgram = require("dgram");
const socket = dgram.createSocket("udp4");
const readline = require("readline");

const serverPort = 8081;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

socket.on("message", (msg) => {
  console.log(`SERVER: ${msg}`);
});

rl.addListener("line", (line) => {
  socket.send(Buffer.from(line), serverPort, "localhost");
});
