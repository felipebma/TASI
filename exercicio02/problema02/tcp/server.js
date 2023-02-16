const net = require("net");

const opcodes = new Set(["ADD", "SUB", "MULT", "DIV"]);

const instructions = `
INSTRUÇÕES:
- Escolha uma operação (ADD, SUB, MULT, DIV)
- Escolha os operandos A e B
- Escreva os 3, separados por espaço. 
eg.: ADD 3 2
`;

const server = net.createServer((socket) => {
  socket.write(instructions);

  socket.on("data", (data) => {
    console.log("User requested: " + data.toString());
    splitted_data = data.toString().split(" ");
    console.log(splitted_data);
    try {
      validateData(splitted_data);
      const x = parseFloat(splitted_data[1]);
      const y = parseFloat(splitted_data[2]);
      let result;
      switch (splitted_data[0]) {
        case "ADD":
          result = x + y;
          socket.write(`${x} + ${y} = ${result}`);
          break;
        case "SUB":
          result = x - y;
          socket.write(`${x} - ${y} = ${result}`);
          break;
        case "MULT":
          result = x * y;
          socket.write(`${x} * ${y} = ${result}`);
          break;
        case "DIV":
          result = x / y;
          socket.write(`${x} / ${y} = ${result}`);
      }
    } catch (error) {
      socket.write(`${error}\n${instructions}`);
    }
  });
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

server.listen(4000);
