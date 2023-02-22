const net = require("net");

const Marshaller = require("./marshaller");
const Unmarshaller = require("./unmarshaller");

const marshaller = new Marshaller();
const unmarshaller = new Unmarshaller();

const opcodes = new Set(["ADD", "SUB", "MULT", "DIV"]);

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    console.log("--------------------------------------");
    console.log("REQUESTED_BUFFER: ");
    console.log(data);
    data = unmarshaller.unmarshal(data);
    console.log("UNMARSHELLED_REQUEST:");
    console.log(data);
    const unmarshalled_result = calculate(data);
    console.log("UNMARSHELLED_RESULT:");
    console.log(unmarshalled_result);
    const result = marshaller.marshal(unmarshalled_result);
    console.log("MARSHELLED_RESULT:");
    console.log(result);
    console.log("--------------------------------------");
    socket.write(result);
  });
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

server.listen(4000);
