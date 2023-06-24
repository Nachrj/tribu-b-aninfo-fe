import React, { useState, useEffect } from 'react';

const PopUpERROR  = ({ title, items, show, onClick }) => {

    if (!show) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-red-500 font-bold text-lg mb-2">{title}</h2>
        {items.map((item) => <p className="text-gray-800">{item}</p>)}
        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded" onClick={onClick}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PopUpERROR ;