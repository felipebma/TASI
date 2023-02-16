const dgram = require("dgram");
const socket = dgram.createSocket("udp4");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let clientPort = -1;

socket.on("message", (msg, rinfo) => {
  console.log(`CLIENT: ${msg}`);
  clientPort = rinfo.port;
});

rl.addListener("line", (line) => {
  socket.send(Buffer.from(line), clientPort, "localhost");
});
socket.bind(8081);
