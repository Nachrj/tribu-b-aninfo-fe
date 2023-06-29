import React from 'react';
import { useRouter } from 'next/router';
import { Product } from '@/utils/types';

export default function ProductGridRow({ product }: {product: Product }) {
  const router = useRouter();

  const handleClick = () => {
    const product_name = product.name;
    const product_version = product.version_id;
    const product_version_name = product.version_name;

    router.push(`/soporte/tickets?product_name=${product_name}&product_version=${product_version}&product_version_name=${product_version_name}`);
  };
  
  return (
    <tr key={product.id} onClick={handleClick} className='cursor-pointer'>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="flex items-center">{product.name}</div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">{product.version_name}</div>
      </td>
    </tr>
  );
}
