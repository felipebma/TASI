const net = require("net");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const server = net.createServer((socket) => {
  console.log("Um novo usuario conectou-se no servidor");

  socket.on("data", (data) => {
    console.log(`USER: ${data.toString()}`);
  });

  rl.addListener("line", (line) => {
    socket.write(line);
  });
});

server.listen(4000);
