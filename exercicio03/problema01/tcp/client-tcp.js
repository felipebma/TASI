const net = require("net");
const readline = require("readline");
const Marshaller = require("./marshaller");
const Unmarshaller = require("./unmarshaller");

const client = net.Socket();
const marshaller = new Marshaller();
const unmarshaller = new Unmarshaller();

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

client.connect(4000, () => {
  console.log(instructions);
  rl.addListener("line", (line) => {
    try {
      const data = parseData(line);
      client.write(marshaller.marshal(data));
    } catch (error) {
      console.log(`${error}\n`);
    }
  });

  client.on("data", (data) => {
    data = unmarshaller.unmarshal(data);
    console.log(`RESULT: ${data.result}\n`);
  });
});

const parseData = (line) => {
  const data = line.split(" ");
  if (data.length < 3) {
    throw "ParserError: A operação deve seguir o padrão: OP A B, onde OP = Código da operação(ADD, SUB, MULT ou DIV), A é o primeiro operando e B é o segundo operando";
  }
  try {
    const opcode = data[0];
    const op1 = parseInt(data[1]);
    const op2 = parseInt(data[2]);
    if (op1 < 0 || op2 < 0) {
      throw new Error();
    }
    return {
      opcode,
      op1,
      op2,
    };
  } catch (error) {
    throw "ParserError: Os operandos devem ser inteiros positivos!"();
  }
};
