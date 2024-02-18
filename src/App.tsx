import React from "react";
import io, { Socket } from "socket.io-client";
import MainChat from "./components/MainChat";

const socket: Socket = io("http://localhost:5000");
// Join a room when a user connects
socket.emit("joinRoom", { roomId: "yourRoomId", userId: socket.id });

const App: React.FC = () => {
  return (
    <div>
      <MainChat socket={socket} />
    </div>
  );
};

export default App;