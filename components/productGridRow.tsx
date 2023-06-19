import React from 'react';
import { useRouter } from 'next/router';
import { Product } from '@/pages/types';


export default function ProductGridRow({ product, onClick }: {product: Product, onClick: any }) {
  const router = useRouter();

  const handleClick = () => {
    const product_name = product.name;
    const product_version = product.version_id;

    router.push(`/tickets?product_name=${product_name}&product_version=${product_version}`);
  };
  
  return (
    <tr key={product.id} onClick={handleClick}>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">{product.name}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">{product.version_name}</div>
      </td>
    </tr>
  );
}
