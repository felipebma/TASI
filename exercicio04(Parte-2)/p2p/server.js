const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const packageDef = protoLoader.loadSync("../chat.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const chatPackage = grpcObject.chatPackage;

const server = new grpc.Server();

server.bind("localhost:50051", grpc.ServerCredentials.createInsecure());

server.addService(chatPackage.Chat.service, {
  join: (call, callback) => {
    const username = call.request.username;
    console.log(`${username} se conectou`);
    rl.on("line", (line) => {
      call.write({ username: "Server", message: line });
    });
  },
  sendMessage: (call, callback) => {
    console.log(`${call.request.username}: ${call.request.message}`);
  },
});

server.start();
