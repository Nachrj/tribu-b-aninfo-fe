// export default function ProductGridRow({ product }) {

//     return (
//         <tr key={`${product['id']}`}>
//             <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
//                 <div className="flex items-center">{product['name']}</div>
//             </td>

//             <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
//                 <div className="text-sm leading-5 text-gray-900">{product['version']}</div>
//             </td>
//         </tr>
//     )
// }
import React from 'react';

export default function ProductGridRow({ product}) {
  const handleClick = () => {
    // Esto no esta del todo bien, habria que usar react
    window.location.href = 'tickets';
  };

  return (
    <tr key={`${product['id']}`} onClick={handleClick}>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">{product['name']}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">{product['version']}</div>
      </td>
    </tr>
  );
}
