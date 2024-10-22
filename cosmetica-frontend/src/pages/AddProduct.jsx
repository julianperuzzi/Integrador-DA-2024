import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const productData = { name, description, price, stock };

        try {
            const response = await fetch('http://localhost:3000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                alert('Producto agregado con éxito');
                // Resetear el formulario
                setName('');
                setDescription('');
                setPrice('');
                setStock('');
                navigate('/products');
            } else {
                const errorData = await response.json();
                alert(`Error al agregar el producto: ${errorData.message || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al agregar el producto');
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-5 border rounded shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Agregar Producto</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full border rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full border rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Precio</label>
                    <input
                        type="number"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="mt-1 block w-full border rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Stock</label>
                    <input
                        type="number"
                        required
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="mt-1 block w-full border rounded-md p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
                >
                    Agregar Producto
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
