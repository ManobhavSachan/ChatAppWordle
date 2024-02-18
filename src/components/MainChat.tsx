import React, { useEffect, useState } from "react";
import UserAvatar from "./UserAvatar";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
// import io from "socket.io-client";
import { Socket } from "socket.io-client";

// const socket = io("http://localhost:5000");
interface MainChatProps {
  socket: Socket;
}
interface Message {
  senderId: string;
  text: string;
}

const MainChat: React.FC<MainChatProps> = ({ socket }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const currentUserId = socket.id; // Replace with actual user ID or logic

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on("message", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    console.log(messages);
    // // Clean up the socket connection and leave the room when the component unmounts
    // return () => {
    //   socket.emit("leave", { roomId: "yourRoomId", userId: currentUserId });
    //   socket.disconnect();
    // };
  }, []);

  const sendMessage = (msg: string) => {
    // Send the message to the server with the room information

    socket.emit("message", { senderId: currentUserId, text: msg });

    // // Update the local state for immediate rendering
    // setMessages((prevMessages) => [
    //   ...prevMessages,
    //   { senderId: currentUserId!, text: message },
    // ]);
  };

  return (
    <div className="flex-1 p-2 sm:p-6 justify-between flex flex-col h-screen">
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div className="relative flex items-center space-x-4">
          <UserAvatar imageUrl="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" />
          <div className="flex flex-col leading-tight">
            <div className="text-2xl mt-1 flex items-center">
              <span className="text-gray-700 mr-3">User</span>
            </div>
            <span className="text-lg text-gray-600">Online</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div
        id="messages"
        className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            isSentByCurrentUser={message.senderId === currentUserId}
            message={message.text}
          />
        ))}
      </div>
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
};

export default MainChat;
