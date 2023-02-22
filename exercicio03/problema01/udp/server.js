const dgram = require("dgram");
const socket = dgram.createSocket("udp4");
const Marshaller = require("./marshaller");
const Unarshaller = require("./unmarshaller");

const opcodes = new Set(["ADD", "SUB", "MULT", "DIV"]);
const marshaller = new Marshaller();
const unmarshaller = new Unarshaller();

const instructions = `
INSTRUÇÕES:
- Escolha uma operação (ADD, SUB, MULT, DIV)
- Escolha os operandos A e B
- Escreva os 3, separados por espaço. 
eg.: ADD 3 2
`;

socket.on("message", (msg, rinfo) => {
  console.log("--------------------------------------");
  console.log("REQUESTED_BUFFER: ");
  console.log(msg);
  data = unmarshaller.unmarshal(msg);
  console.log("UNMARSHELLED_REQUEST:");
  console.log(data);
  const unmarshalled_result = calculate(data);
  console.log("UNMARSHELLED_RESULT:");
  console.log(unmarshalled_result);
  const result = marshaller.marshal(unmarshalled_result);
  console.log("MARSHELLED_RESULT:");
  console.log(result);
  console.log("--------------------------------------");
  socket.send(result, rinfo.port);

  // console.log(`User requested: ${msg.toString()}`);
  // splitted_data = msg.toString().split(" ");
  // console.log(splitted_data);
  // try {
  //   validateData(splitted_data);
  //   const x = parseFloat(splitted_data[1]);
  //   const y = parseFloat(splitted_data[2]);
  //   let result;
  //   switch (splitted_data[0]) {
  //     case "ADD":
  //       result = x + y;
  //       socket.send(
  //         Buffer.from(`${x} + ${y} = ${result}`),
  //         rinfo.port,
  //         "localhost"
  //       );
  //       break;
  //     case "SUB":
  //       result = x - y;
  //       socket.send(
  //         Buffer.from(`${x} - ${y} = ${result}`),
  //         rinfo.port,
  //         "localhost"
  //       );
  //       break;
  //     case "MULT":
  //       result = x * y;
  //       socket.send(
  //         Buffer.from(`${x} * ${y} = ${result}`),
  //         rinfo.port,
  //         "localhost"
  //       );
  //       break;
  //     case "DIV":
  //       result = x / y;
  //       socket.send(
  //         Buffer.from(`${x} / ${y} = ${result}`),
  //         rinfo.port,
  //         "localhost"
  //       );
  //   }
  // } catch (error) {
  //   socket.send(
  //     Buffer.from(`${error}\n${instructions}`),
  //     rinfo.port,
  //     "localhost"
  //   );
  // }
});

const calculate = (data) => {
  switch (data.opcode) {
    case "ADD":
      return {
        opcode: "RESULT",
        result: data.op1 + data.op2,
      };

    case "SUB":
      return {
        opcode: "RESULT",
        result: data.op1 - data.op2,
      };

    case "DIV":
      return {
        opcode: "RESULT",
        result: Math.floor(data.op1 / data.op2),
      };

    case "MULT":
      return {
        opcode: "RESULT",
        result: data.op1 * data.op2,
      };
  }
};

socket.bind(8081);
