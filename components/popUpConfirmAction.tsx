import React from 'react';
import { useRouter } from 'next/router';

const PopUpConfirmAction = ({ title, show, onClickAcept }) => {
    const router = useRouter();

    const onClickClose = () =>{
        router.back();
    }
    
    if (!show) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 min-w-400">
            <div className="bg-white p-4 rounded shadow ">
                <h2 className="text-red-500 font-bold text-lg mb-2">{title}</h2>
                <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded" onClick={onClickAcept}>
                    Confirmar
                </button>
                <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded" onClick={onClickClose}>
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default PopUpConfirmAction;