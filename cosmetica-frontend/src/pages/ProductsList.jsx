import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductsList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:3000/api/products');
            const data = await response.json();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:3000/api/products/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setProducts(products.filter((product) => product.id !== id));
        }
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 p-5 bg-white shadow-md rounded">
            <h1 className="text-3xl font-bold mb-6 text-center">Lista de Productos</h1>
            <Link to="/add-product" className="mb-4 inline-block bg-green-500 text-white p-2 rounded hover:bg-blue-700">
                Agregar Producto
            </Link>
            <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border-b p-3 text-left">Imagen</th>
                        <th className="border-b p-3 text-left">Nombre</th>
                        <th className="border-b p-3 text-left">Precio</th>
                        <th className="border-b p-3 text-left">Stock</th>
                        <th className="border-b p-3 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-100 transition-colors">
                            <td className="border-b p-3">
                                <img src={product.url_image} alt={product.name} className="h-16 w-16 object-cover" />
                            </td>
                            <td className="border-b p-3">{product.name}</td>
                            <td className="border-b p-3">${product.price}</td>
                            <td className="border-b p-3">{product.stock}</td>
                            <td className="border-b p-3">
                                <Link to={`/edit-product/${product.id}`} className="text-white bg-orange-500 p-2 hover:underline">Editar</Link>
                                <button onClick={() => handleDelete(product.id)} className="text-white bg-red-500 p-2 hover:underline ml-4">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsList;
