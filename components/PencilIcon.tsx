import React from 'react';
import { BiSolidPencil } from 'react-icons/bi';

const EditButton = ({ onClick }) => {
  return (
    <button className="flex items-center text-black px-4 py-2 rounded cursor-pointer" onClick={onClick}>
      <BiSolidPencil className="mr-2 w-full text-2xl" />
    </button>
  );
};

export default EditButton;
