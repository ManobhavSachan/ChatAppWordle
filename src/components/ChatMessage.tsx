import React from 'react';
import UserAvatar from './UserAvatar';

interface ChatMessageProps {
  isSentByCurrentUser: boolean;
  message: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ isSentByCurrentUser, message }) => (
  <div className={`chat-message ${isSentByCurrentUser ? 'items-end justify-end' : 'items-start'}`}>
    <div className="flex items-end">
      <div className={`flex flex-col space-y-2 text-xs max-w-xs mx-2 ${isSentByCurrentUser ? 'order-1 items-end' : 'order-2 items-start'}`}>
        <div>
          <span className={`px-4 py-2 rounded-lg ${isSentByCurrentUser ? 'rounded-br-none bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>{message}</span>
        </div>
      </div>
      <UserAvatar imageUrl="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" />
    </div>
  </div>
);

export default ChatMessage;