import React, { useEffect, useState } from 'react';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/products'); // Cambia esta URL por la de tu API
                if (!response.ok) {
                    throw new Error('Error fetching products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-orange-400 text-white py-48 text-center">
                <h1 className="text-6xl font-bold">Bienvenido a Cosmetica AR</h1>
                <p className="mt-2 text-lg">Los mejores productos para tu cuidado personal</p>
            </header>

            <section className="py-12">
                <h2 className="text-3xl font-semibold text-center mb-8">Nuestros Productos</h2>
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {loading ? (
                        <p className="text-center">Cargando productos...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : (
                        products.map((product) => (
                            <div key={product.id} className="bg-white rounded-none shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <img src={product.url_image} alt={product.name} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-xl font-bold">{product.name}</h3>
                                    <p className="text-gray-700">{product.price}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            <section className="py-12 bg-gray-200">
                <h2 className="text-3xl font-semibold text-center mb-8">Testimonios</h2>
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Ejemplo de testimonios */}
                    <div className="bg-white p-6 rounded-none shadow-md">
                        <p>"¡Los productos son maravillosos! Noté la diferencia desde el primer uso."</p>
                        <h4 className="font-bold mt-4">- Juan Pérez</h4>
                    </div>
                    <div className="bg-white p-6 rounded-none shadow-md">
                        <p>"El mejor servicio al cliente que he experimentado. ¡Recomiendo esta marca!"</p>
                        <h4 className="font-bold mt-4">- María López</h4>
                    </div>
                    <div className="bg-white p-6 rounded-none shadow-md">
                        <p>"Calidad excepcional y envío rápido. Estoy muy satisfecha."</p>
                        <h4 className="font-bold mt-4">- Ana González</h4>
                    </div>
                </div>
            </section>

            <section className="py-12">
                <h2 className="text-3xl font-semibold text-center mb-8">Contáctanos</h2>
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <p className="mb-4">Si tienes alguna pregunta o comentario, no dudes en contactarnos.</p>
                    <p className="font-bold">Email: soporte@mimarca.com</p>
                    <p className="font-bold">Teléfono: (123) 456-7890</p>
                </div>
            </section>
        </div>
    );
};

export default Home;
