import React from 'react';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { useRouter } from 'next/router';

const GoBackIcon = () => {
  const router = useRouter();
  const onClickBackArrorw = () => {
    router.back();
  }; 
  return (
    <button style={{ backgroundColor: "purple"}} className="flex items-center text-white bg-black px-4 py-2 rounded cursor-pointer" onClick={onClickBackArrorw} >
      <MdOutlineArrowBackIos className="w-full text-xl" />
    </button>
  );
};

export default GoBackIcon;
