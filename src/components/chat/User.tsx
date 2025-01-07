import { TConversation, TUserWithChat } from '@/helper/type';
import React from 'react';
import Avatar from '../Avatar';
import { fromNow } from '@/helper/dayjs';

interface UserProps {
  user: TUserWithChat;
  currentUserId: string;
}

const User = ({ user, currentUserId }: UserProps) => {
  const conversations = Array.isArray(user.conversations) ? user.conversations : [];
  const messagesWithCurrentUser = conversations.find((conversation: TConversation) =>
    conversation.users.find((user) => user.id === currentUserId)
  );
  const latestMessage = messagesWithCurrentUser?.messages.slice(-1)[0];

  return (
    <div
      className='
      grid
      grid-cols-[40px_1fr_50px]
      grid-rows-[40px]
      gap-3
      py-3
      border-b-[1px]
      hover:cursor-pointer
      hover:bg-basic
    '
    >
      <div>
        <Avatar src={user.image!} />
      </div>
      <div>
        <h3>{user.name}</h3>
        {latestMessage && (
          <p
            className='
          overflow-hidden
          text-xs
          font-medium
          text-gray-600
          break-words
          whitespace-pre-wrap
          '
          >
            {latestMessage.text}
          </p>
        )}
        {latestMessage && latestMessage.image && <p className='text-xs font-medium text-gray-600'>[이미지]</p>}
      </div>
      <div>{latestMessage && <p>{fromNow(latestMessage.createdAt)}</p>}</div>
    </div>
  );
};

export default User;
