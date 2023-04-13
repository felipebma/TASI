const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const packageDef = protoLoader.loadSync("calculator.proto", {});

const grpcObject = grpc.loadPackageDefinition(packageDef);

const calculatorPackage = grpcObject.calculatorPackage;

const server = new grpc.Server();

server.bind("localhost:50051", grpc.ServerCredentials.createInsecure());

server.addService(calculatorPackage.Calculator.service, {
  add: (call, callback) => {
    console.log(call.request);
    console.log("ADD:", call.request.value1, call.request.value2);
    callback(null, {
      result: call.request.value1 + call.request.value2,
    });
  },
  sub: (call, callback) => {
    console.log("SUB:", call.request.value1, call.request.value2);
    callback(null, {
      result: call.request.value1 - call.request.value2,
    });
  },
  div: (call, callback) => {
    console.log("DIV:", call.request.value1, call.request.value2);
    callback(null, {
      result: call.request.value1 / call.request.value2,
    });
  },
  mult: (call, callback) => {
    console.log("MULT:", call.request.value1, call.request.value2);
    callback(null, {
      result: call.request.value1 * call.request.value2,
    });
  },
});

server.start();
