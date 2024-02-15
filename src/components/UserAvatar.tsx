import React from 'react';

interface UserAvatarProps {
  imageUrl: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ imageUrl }) => (
  <div className="relative">
    <span className="absolute text-green-500 right-0 bottom-0">
      <svg width="20" height="20">
        <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
      </svg>
    </span>
    <img src={imageUrl} alt="User profile" className="w-10 sm:w-16 h-10 sm:h-16 rounded-full" />
  </div>
);

export default UserAvatar;