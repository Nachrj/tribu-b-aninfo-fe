import React from 'react';

const Input = ({ label, ...rest }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-800 font-bold mb-4">{label}</label>
      <input
        className="w-full px-3 py-2 border border-blue-800 rounded-md focus:outline-none focus:ring focus:border-blue-800"
        {...rest}
      />
    </div>
  );
};

export default Input;