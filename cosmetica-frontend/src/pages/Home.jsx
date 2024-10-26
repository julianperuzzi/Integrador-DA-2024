import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/products'); 
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
            <header className="bg-gradient-to-b from-amber-700/70 via-amber-700/50 to-amber-700/40 text-white py-48 text-center">
                <h1 className="text-6xl font-bold ">Bienvenido a Cosmetica AR</h1>
                <p className="mt-2 text-lg">Los mejores productos para tu cuidado personal</p>
                <Link to="/products" className="mt-4 inline-block bg-white text-orange-400 font-semibold py-2 px-6 rounded-full hover:bg-gray-200 transition duration-200">
                    Ver Productos
                </Link>
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
                            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                <img src={product.url_image} alt={product.name} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-xl font-bold">{product.name}</h3>
                                    <p className="text-gray-700 font-semibold">${product.price}</p>
                                    <Link to={`/products`} className="mt-2 inline-block bg-teal-600 text-white py-2 px-4 rounded-full hover:bg-teal-700 transition duration-200">
                                        Ver Detalles
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            <section className="py-12 bg-gray-100">
    <h2 className="text-3xl font-semibold text-center mb-8 ">Quiénes Somos</h2>
    <div className=" w-full md:h-[50vh] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-white shadow-lg">
        <div className='md:text-right md:pr-6 md:pl-20 flex flex-col space-y-8'>
        <h3 className="text-3xl font-semibold  mb-8 ">Cosmetica AR</h3>
            <p className="text-gray-700 text-lg ml-20">
                En Cosmética AR, nos dedicamos a ofrecer productos de alta calidad para el cuidado personal. 
                Nuestro objetivo es mejorar el bienestar de nuestros clientes mediante productos naturales, 
                seguros y eficaces. Nos enorgullece ofrecer un servicio excepcional y productos que realmente 
                marcan la diferencia.
            </p>
            <p className="mt-8 text-gray-700 text-lg">
                Nos apasiona la belleza y la salud, y trabajamos constantemente para innovar y cumplir con 
                las expectativas de nuestros clientes.
            </p>
        </div>
        <div>
            <img 
                src="https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg" 
                alt="Imagen de Cosmética AR" 
                className="md:h-[50vh] w-full object-cover"
            />
        </div>
    </div>
</section>


<section className="py-12 bg-gray-100">
    <h2 className="text-3xl font-semibold text-center mb-8">Testimonios</h2>
    <Swiper
        navigation={{ hidden: true}}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }} 
        loop={true} 
        className="mySwiper"
    >
        <SwiperSlide>
            <div className="bg-white p-6  px-24 text-center py-8">
                <p>"¡Los productos son maravillosos! Noté la diferencia desde el primer uso."</p>
                <h4 className="font-bold mt-4">- Juan Pérez</h4>
                <img src="https://i.pinimg.com/enabled/564x/01/aa/d9/01aad90be7a9a7368a42c82c832393a1.jpg" alt="" className="w-28 h-28 object-cover mx-auto rounded-full my-4" />
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="bg-white p-6 shadow-md px-24 text-center py-8">
                <p>"El mejor servicio al cliente que he experimentado. ¡Recomiendo esta marca!"</p>
                <h4 className="font-bold mt-4">- María López</h4>
                <img src="https://i.pinimg.com/enabled/564x/0f/45/27/0f4527aeb08f61a68161a19f9bb4e3b5.jpg" alt="" className="w-28 h-28 object-cover mx-auto rounded-full my-4" />
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="bg-white p-6 shadow-md px-24 text-center py-8">
                <p>"Calidad excepcional y envío rápido. Estoy muy satisfecha."</p>
                <h4 className="font-bold mt-4">- Ana González</h4>
                <img src="https://i.pinimg.com/enabled/564x/94/e9/02/94e902ed11edd05283b9f2859b1e9384.jpg" alt="" className="w-28 h-28 object-cover mx-auto rounded-full my-4" />
            </div>
        </SwiperSlide>
    </Swiper>
</section>

            <section className="py-12 ">
                <h2 className="text-3xl font-semibold text-center mb-8">Promociones</h2>
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <h3 className="text-xl font-bold">Descuento del 20%</h3>
                        <p className="mt-2">En tu primera compra al registrarte.</p>
                        <Link to="/signup" className="mt-4 inline-block bg-teal-600 text-white py-2 px-4 rounded-full hover:bg-teal-700 transition duration-200">Registrarse</Link>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <h3 className="text-xl font-bold">Envío Gratis</h3>
                        <p className="mt-2">Para pedidos superiores a $50.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <h3 className="text-xl font-bold">Compra 2, Llévate 1</h3>
                        <p className="mt-2">Aplicable en productos seleccionados.</p>
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
