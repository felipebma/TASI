const readline = require("readline");
const grpc = require("grpc");
const chalk = require("chalk");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("../chat.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
chatPackage = grpcObject.chatPackage;

const client = new chatPackage.Chat(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let username;
console.log("Digite o seu username:");

rl.addListener("line", (line) => {
  if (!username) {
    username = line.trim();
    console.log(`Username definido: ${username}`);
    let chat = client.join({ username });

    chat.on("data", (data) => {
      if (data.username === "SERVER") {
        console.log(chalk.bgGreen(`${data.username}: ${data.message}`));
      } else {
        console.log(`${data.username}: ${data.message}`);
      }
    });
  } else {
    client.sendMessage({ username: username, message: line }, (res) => {});
  }
});
