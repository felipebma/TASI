const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const packageDef = protoLoader.loadSync("../chat.proto", {});

const grpcObject = grpc.loadPackageDefinition(packageDef);

const chatPackage = grpcObject.chatPackage;

const server = new grpc.Server();

server.bind("localhost:50051", grpc.ServerCredentials.createInsecure());

const users = [];

server.addService(chatPackage.Chat.service, {
  join: (call, callback) => {
    const username = call.request.username;
    console.log(`${username} se juntou ao servidor`);
    users.push(call);
    sendToAll("SERVER", `${username} se juntou ao servidor`);
  },
  sendMessage: (call, callback) => {
    console.log(`${call.request.username}: ${call.request.message}`);
    sendToAll(call.request.username, call.request.message);
  },
});

const sendToAll = (sender, message) => {
  users.forEach((user) => {
    user.write({ username: sender, message });
  });
};

server.start();
