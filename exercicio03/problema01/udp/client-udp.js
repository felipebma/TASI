const dgram = require("dgram");
const socket = dgram.createSocket("udp4");
const readline = require("readline");
const Marshaller = require("./marshaller");
const Unarshaller = require("./unmarshaller");

const serverPort = 8081;
const marshaller = new Marshaller();
const unmarshaller = new Unarshaller();

const instructions = `
INSTRUÇÕES:
- Escolha uma operação (ADD, SUB, MULT, DIV)
- Escolha os operandos A e B
- Escreva os 3, separados por espaço. 
eg.: ADD 3 2
`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

socket.on("message", (msg) => {
  data = unmarshaller.unmarshal(msg);
  console.log(`RESULT: ${data.result}\n`);
});

rl.addListener("line", (line) => {
  try {
    const data = parseData(line);
    socket.send(marshaller.marshal(data), serverPort);
  } catch (error) {
    console.log(`${error}\n`);
  }
});

const parseData = (line) => {
  const data = line.split(" ");
  if (data.length < 3) {
    throw "ParserError: A operação deve seguir o padrão: OP A B, onde OP = Código da operação(ADD, SUB, MULT ou DIV), A é o primeiro operando e B é o segundo operando";
  }
  if (isNaN(data[1]) || isNaN(data[2])) {
    throw "ParserError: Os operandos devem ser inteiros positivos!";
  }
  const opcode = data[0];
  const op1 = parseInt(data[1]);
  const op2 = parseInt(data[2]);
  if (op1 < 0 || op2 < 0) {
    throw "ParserError: Os operandos devem ser inteiros positivos!";
  }
  return {
    opcode,
    op1,
    op2,
  };
};

console.log(instructions);
