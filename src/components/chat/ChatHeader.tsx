import React from 'react';
import { IoChevronDownCircleSharp } from 'react-icons/io5';
import Avatar from '../Avatar';
import { FormatTime } from '@/helper/dayjs';

interface ChatHeaderProps {
  setLayout: (layout: boolean) => void;
  receiverName: string;
  receiverImage: string;
  lastMessageTime: Date | null;
}

const ChatHeader = ({ setLayout, receiverName, receiverImage, lastMessageTime }: ChatHeaderProps) => {
  return (
    <div className='pl-4 border-b-[1px]'>
      <div className='flex items-center h-16 gap-4'>
        <div className='flex items-center justify-center text-3xl text-gray-400 hover:text-gray-600'>
          <button onClick={() => setLayout(false)} className='md:hidden'>
            <IoChevronDownCircleSharp />
          </button>
        </div>
        <div className='flex items-center gap-[0.6rem]'>
          <div>
            <Avatar src={receiverImage} />
          </div>
          <h2 className='text-lg font-semibold'>
            {receiverName}
            {lastMessageTime && <p className='text-gray-600'>{FormatTime(lastMessageTime)}</p>}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
