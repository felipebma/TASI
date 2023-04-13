const readline = require("readline");
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("calculator.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
calculatorPackage = grpcObject.calculatorPackage;

const instructions = `
INSTRUÇÕES:
- Escolha uma operação (ADD, SUB, MULT, DIV)
- Escolha os operandos A e B
- Escreva os 3, separados por espaço. 
eg.: ADD 3 2
`;

const client = new calculatorPackage.Calculator(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const opcodes = ["ADD", "SUB", "MULT", "DIV"];

console.log(instructions);

rl.addListener("line", (line) => {
  try {
    command = line.split(" ");
    validate(command);
    callOperation(command);
  } catch (err) {
    console.log(err.message);
    console.log("----------------------------");
    console.log(instructions);
  }
});

const validate = (command) => {
  if (command.length < 3) {
    throw new Error("Comando inválido, leia as instruções e tente novamente");
  }
  if (!opcodes.includes(command[0])) {
    throw new Error("Operação inválida, leia as instruções e tente novamente");
  }
  if (isNaN(command[1]) || isNaN(command[2])) {
    throw new Error(
      "Operandos inválidos, leia as instruções e tente novamente"
    );
  }
};

const callOperation = (command) => {
  value1 = parseFloat(command[1]);
  value2 = parseFloat(command[2]);
  switch (command[0]) {
    case "ADD":
      client.add({ value1: value1, value2: value2 }, (err, response) => {
        console.log(response.result);
      });
      break;
    case "SUB":
      client.sub({ value1, value2 }, (err, response) => {
        console.log(response.result);
      });
      break;
    case "MULT":
      client.mult({ value1, value2 }, (err, response) => {
        console.log(response.result);
      });
      break;
    case "DIV":
      client.div({ value1, value2 }, (err, response) => {
        console.log(response.result);
      });
      break;
  }
};
