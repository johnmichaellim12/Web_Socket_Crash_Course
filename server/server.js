const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let playerScores = [];

io.on("connection", (socket) => {
  // console.log(socket);
  socket.on("scores", (scores) => {
    playerScores.push({ ...scores, id: socket.id });

    socket.emit("playerScores", playerScores);
  });

  //   socket.on("message", (data) => {
  //     console.log(data);
  //   });

  //   socket.emit("message", "Hello");
  setInterval(() => {
    socket.emit("playerScores", playerScores);
  }, 5000);
});

httpServer.listen(3000, () => {
  //   console.log("Server is connected");
  console.log("Server is running!");
});
