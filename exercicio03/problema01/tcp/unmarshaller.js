module.exports = class Unmarshaller {
  constructor() {
    this.opcodes = { 0: "ADD", 1: "SUB", 2: "DIV", 3: "MULT", 4: "RESULT" };
  }

  toInt(arr) {
    let res = 0;
    const aux = 1 << 8;
    for (let i = 0; i < 4; i++) {
      res *= aux;
      res += arr[i];
    }
    return res;
  }

  unmarshal(buffer) {
    const opcode = this.opcodes[buffer[0]];
    if (opcode == "RESULT") {
      return {
        opcode,
        result: this.toInt(buffer.subarray(1, 5)),
      };
    } else {
      return {
        opcode,
        op1: this.toInt(buffer.subarray(1, 5)),
        op2: this.toInt(buffer.subarray(5, 9)),
      };
    }
  }
};
