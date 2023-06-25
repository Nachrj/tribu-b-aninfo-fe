import React from 'react';
import { useRouter } from 'next/router';

const PopUpConfirmAction = ({ show, title, message, onClickAcept, onClickClose }) => {
    const router = useRouter();

    if (!show) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 min-w-400">
            <div className="bg-white p-4 rounded shadow ">
                <h2 className="text-back font-bold text-lg mb-2">{title}</h2>
                <p className="text-gray-500">{message}</p>
                <button className="mt-4 mx-2 px-4 py-2 bg-green-500 text-white rounded" onClick={onClickAcept}>
                    Confirmar
                </button>
                <button className="mt-4 mx-2 px-4 py-2 bg-red-500 text-white rounded" onClick={onClickClose}>
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default PopUpConfirmAction;