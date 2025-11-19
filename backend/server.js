const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectdb = require("./config/connectdb.js");
const Message = require("./models/messages.js");
const messageRoutes = require("./routes/messages.js");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// CORS - must be BEFORE routes
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use("/api/messages", messageRoutes);

// Socket.io configuration
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Store connected users → { email: socket.id }
let users = {};

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  socket.on("register", (email) => {
    users[email] = socket.id;
    console.log("User registered:", email, socket.id);
  });

  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room: ${room}`);
  });

  socket.on("sendMessage", async (msg) => {
    try {
      const message = new Message(msg);
      await message.save();
      if (msg.room) io.to(msg.room).emit("receiveMessage", [message]);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("privateMessage", async ({ from, to, text }) => {
    try {
      const message = new Message({
        sender: from,
        receiver: to,
        text,
        private: true,
      });
      await message.save();
      const receiverSocket = users[to];
      if (receiverSocket) io.to(receiverSocket).emit("receiveMessage", message);
    } catch (error) {
      console.error("Error sending private message:", error);
    }
  });

  socket.on("typing", ({ sender, room, receiver }) => {
    if (room) socket.to(room).emit("userTyping", { sender });
    else if (receiver) {
      const receiverSocket = users[receiver];
      if (receiverSocket) io.to(receiverSocket).emit("userTyping", { sender });
    }
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
    for (const email in users) {
      if (users[email] === socket.id) delete users[email];
    }
  });
});

// Connect to MongoDB
connectdb();

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
