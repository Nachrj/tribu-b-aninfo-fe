import React from 'react';

const Input = ({ label, ...rest }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-800 font-bold mb-4">{label}</label>
      <input
        className="w-min px-3 py-2 border  rounded-md focus:outline-none focus:ring focus:border-blue-800 text-black"
        {...rest}
      />
    </div>
  );
};

export default Input;