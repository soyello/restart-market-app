import React from 'react';
import { IconType } from 'react-icons';

interface CategoryInputProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  path: string;
  onClick: (value: string) => void;
}

const CategoryInput = ({ icon: Icon, label, selected, onClick, path }: CategoryInputProps) => {
  return (
    <div
      onClick={() => onClick(path)}
      className={`
          rounded-xl
          border-2
          p-4
          flex
          flex-col
          gap-3
          hover:border-secondary
          transition
          cursor-pointer
          ${selected ? 'border-basic' : 'border-neutral-200'}        
      `}
    >
      <Icon size={30} />
      <div className='font-semibold'>{label}</div>
    </div>
  );
};

export default CategoryInput;
