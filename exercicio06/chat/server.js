var WebSocketServer = require("ws").Server;
var http = require("http");
const EventEmitter = require("events");

const eventEmitter = new EventEmitter();
wss = new WebSocketServer({ port: 8080, path: "/testing" });

let newMessage = "";

wss.on("connection", function (ws) {
  ws.on("message", function (message) {
    console.log("Msg received in server: %s ", message);
    newMessage = `${message}\n`;
    eventEmitter.emit("message");
  });
  eventEmitter.on("message", () => {
    ws.send(newMessage);
  });
  console.log("new connection");
});

http
  .createServer(function (req, res) {
    res.writeHeader(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
    });
    eventEmitter.on("message", () => {
      res.write(newMessage);
    });
  })
  .listen(9090);
console.log("Server started!");
