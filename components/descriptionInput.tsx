import React from 'react';

const DescriptionInput = ({ label, value }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-800 font-bold mb-4">{label}</label>
      <textarea
        value={value}
        className="resize-none   overflow-hidden w-full block py-4 border rounded-md focus:outline-none focus:ring focus:border-blue-800 text-black"
      />
      
    </div>
  );
};

export default DescriptionInput;