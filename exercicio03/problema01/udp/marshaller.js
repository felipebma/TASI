module.exports = class Marshaller {
  constructor() {
    this.opcodes = { ADD: 0, SUB: 1, DIV: 2, MULT: 3, RESULT: 4 };
  }

  convert(value) {
    const arr = [0, 0, 0, 0];
    const v = value;
    let aux = 1 << 8;
    for (let i = 3; i >= 0; i--) {
      arr[i] = value % aux;
      value = Math.floor(value / aux);
    }
    return arr;
  }

  marshal(data) {
    const opcode = data.opcode;
    if (opcode == undefined || !(opcode in this.opcodes)) {
      throw `MarshallingError: Opcode inexistente: ${opcode}`;
    }
    if (opcode == "RESULT") {
      const result = data.result;
      const buffer = Buffer.alloc(5);
      buffer[0] = this.opcodes[opcode];
      return Buffer.from([this.opcodes[opcode]].concat(this.convert(result)));
    } else {
      const { op1, op2 } = data;
      return Buffer.from(
        [this.opcodes[opcode]].concat(this.convert(op1), this.convert(op2))
      );
    }
  }
};
