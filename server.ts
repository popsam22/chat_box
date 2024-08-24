import express, { Request, Response } from "express";
import http from "http";
import path from "path";
import { Server, Socket } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "./public")));

io.on("connection", (socket: Socket) => {
  console.log("User connected successfully.");

  socket.on("disconnect", () => {
    console.log("User successfully disconnected.");
  });

  socket.on("chat box", (message: string) => {
    console.log("message: " + message);
    io.emit("chat box", message);
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("This is my web document");
});

const PORT = 6000;
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
