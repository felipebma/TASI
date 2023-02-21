const dgram = require("dgram");
const socket = dgram.createSocket("udp4");

const opcodes = new Set(["ADD", "SUB", "MULT", "DIV"]);

const instructions = `
INSTRUÇÕES:
- Escolha uma operação (ADD, SUB, MULT, DIV)
- Escolha os operandos A e B
- Escreva os 3, separados por espaço. 
eg.: ADD 3 2
`;

socket.on("message", (msg, rinfo) => {
  console.log(`User requested: ${msg.toString()}`);
  splitted_data = msg.toString().split(" ");
  console.log(splitted_data);
  try {
    validateData(splitted_data);
    const x = parseFloat(splitted_data[1]);
    const y = parseFloat(splitted_data[2]);
    let result;
    switch (splitted_data[0]) {
      case "ADD":
        result = x + y;
        socket.send(
          Buffer.from(`${x} + ${y} = ${result}`),
          rinfo.port,
          "localhost"
        );
        break;
      case "SUB":
        result = x - y;
        socket.send(
          Buffer.from(`${x} - ${y} = ${result}`),
          rinfo.port,
          "localhost"
        );
        break;
      case "MULT":
        result = x * y;
        socket.send(
          Buffer.from(`${x} * ${y} = ${result}`),
          rinfo.port,
          "localhost"
        );
        break;
      case "DIV":
        result = x / y;
        socket.send(
          Buffer.from(`${x} / ${y} = ${result}`),
          rinfo.port,
          "localhost"
        );
    }
  } catch (error) {
    socket.send(
      Buffer.from(`${error}\n${instructions}`),
      rinfo.port,
      "localhost"
    );
  }
});

const validateData = (splitted_data) => {
  if (splitted_data.length != 3) {
    throw new Error(
      "A operação deve seguir o padrão: OP A B, onde OP = Código da operação(ADD, SUB, MULT ou DIV), A é o primeiro operando e B é o segundo operando"
    );
  }
  if (!opcodes.has(splitted_data[0])) {
    throw new Error("Código de operação inválido");
  }
  if (isNaN(splitted_data[1]) || isNaN(splitted_data[2])) {
    throw new Error("Os operandos devem ser números");
  }
};

socket.bind(8081);
