import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`http://localhost:3000/api/products/${id}`);
            const data = await response.json();
            setProduct(data);
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (response.ok) {
                alert('Producto editado con éxito');
                navigate('/products'); // Redirige a la lista de productos
            } else {
                alert('Error al editar el producto');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al editar el producto');
        }
    };

    if (!product) return <div>Cargando...</div>;

    return (
        <div className="max-w-lg mx-auto mt-10 p-5 border rounded shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Editar Producto</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={product.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea
                        name="description"
                        
                        value={product.description}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Precio</label>
                    <input
                        type="number"
                        name="price"
                        required
                        value={product.price}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Stock</label>
                    <input
                        type="number"
                        name="stock"
                        required
                        value={product.stock}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded-md p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
                >
                    Editar Producto
                </button>
            </form>
        </div>
    );
};

export default EditProduct;
