const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
// const socket = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:5173",
//   },
// });

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

// socket.on("connection", (socket) => {
//   console.log(socket);

//   //   socket.on("message", (data) => {
//   //     console.log(data);
//   //   });

//   //   socket.emit("message", "Hello");
// });

let crudData = [];

io.on("connection", (socket) => {
  socket.on("data", (data) => {
    // console.log(data);

    crudData.push(data);

    // console.log(crudData); // terminal

    socket.emit("crudData", crudData);
  });

  socket.on("editData", (data) => {
    console.log(data);

    let currentIndex = crudData.findIndex((data) => data.id === data.id);

    if (currentIndex !== -1) {
      crudData[currentIndex] = { ...crudData[currentIndex], ...data };
    }
  });
  // console.log(crudData); // for console web

  socket.on("deleteData", (id) => {
    let currentIndex = crudData.findIndex((data) => data.id === id);

    if (currentIndex !== -1) {
      crudData.splice(currentIndex, 1);
    }
  });

  setInterval(() => {
    socket.emit("crudData", crudData);
  }, 1000);
});

httpServer.listen(3000, () => {
  //   console.log("Server is connected");
  console.log("Server is running!");
});
