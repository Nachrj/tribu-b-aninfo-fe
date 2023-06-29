import React, { FC } from 'react';
import { MdDelete } from 'react-icons/md';

type ButtonProps = {
  onClick: (a: any) => void;
};

const DeleteButton: FC<ButtonProps> = ({ onClick }) => {
  return (
    <button className="flex items-center text-black px-4 py-2 rounded cursor-pointer" onClick={onClick}>
      <MdDelete className="mr-2 w-full text-2xl" />
    </button>
  );
};

export default DeleteButton;
