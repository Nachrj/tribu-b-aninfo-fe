import {Product} from "@/pages/types";
import {useEffect, useState} from "react";
import ProductGridRow from "@/components/productGridRow";
import React from 'react';
import { BASE_URL } from "@/pages/constants";
import HeaderItem from "@/components/HeaderItem";
import { getProducts } from "@/requests/products";

export default function Products() {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        getProducts(setProducts);
    }, []);

    return (
        <div className="container max-w-7xl mx-auto mt-8">
            <div className="mb-4">
                <h1 className="text-black text-3xl font-bold decoration-gray-400">Productos</h1>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 w-full">
                    <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg text-black">
                        <table className="min-w-full">
                            <thead>
                            <tr>
                                <HeaderItem title="Name" />
                                <HeaderItem title="Version" />
                            </tr>
                            </thead>

                            <tbody>
                                {
                                    products.map((product) => ( 
                                        <ProductGridRow key={product.id} product={product}/>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
