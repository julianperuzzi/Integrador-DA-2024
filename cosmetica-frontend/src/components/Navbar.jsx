// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../components/CartContext'; // Importar el hook de carrito
import { useAuth } from '../AuthContext'; // Importar el hook de autenticación

const Navbar = () => {
    const { cart } = useCart(); // Usar el contexto de carrito
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0); // Contar total de ítems en el carrito
    const { user, logout } = useAuth(); // Obtener información del usuario autenticado

    // Estado para controlar la visibilidad del menú móvil
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Función para alternar el menú
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-amber-700/60 shadow-sm z-20 sticky ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-24 items-center">

                    <div className="flex items-center">
                        <Link to="/" className="font-bold text-white hover:text-gray-200 px-4 pr-16 text-2xl">Cosmetica AR</Link>                        
                    </div>

                    {/* Menú hamburguesa para móviles */}
                    <div className="sm:hidden">
                        <button onClick={toggleMenu} className="text-white focus:outline-none">
                            {isMenuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <div className="flex items-center">                        
                        <div className="hidden sm:flex sm:space-x-8">
                            <Link to="/" className="text-gray-200 hover:text-white">Inicio</Link>
                            <Link to="/products" className="text-gray-200 hover:text-white">Productos</Link>
                            
                            {/* Muestra estos enlaces solo si el usuario está autenticado */}
                            {user && (
                                <>
                                    <Link to="/productslist" className="text-gray-200 hover:text-white">Administrador</Link>
                                    <Link to="/usuarios" className="text-gray-200 hover:text-white">Usuarios</Link>
                                    <Link to="/proveedores" className="text-gray-200 hover:text-white">Proveedores</Link>
                                </>
                            )}
                            
                            <Link to="/cart" className="text-gray-200 hover:text-white">Carrito ({totalItems})</Link>
                        </div>
                    </div>

                    <div className="hidden sm:flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link to="/perfil" className="text-gray-200 hover:text-white uppercase font-bold">{user.username}</Link>
                                <button
                                    onClick={logout}
                                    className="bg-red-600 text-white py-2 px-4 border border-transparent hover:bg-red-700 transition duration-200"
                                >
                                    Cerrar Sesión
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="bg-amber-800 text-white py-2 px-4 border border-transparent hover:bg-teal-900 transition duration-200">Iniciar Sesión</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Menú desplegable para móvil */}
            {isMenuOpen && (
                <div className="sm:hidden bg-teal-600/90 p-4">
                    <div className="flex flex-col space-y-2">
                        <Link to="/" className="text-gray-200 hover:text-white">Inicio</Link>
                        <Link to="/products" className="text-gray-200 hover:text-white">Productos</Link>
                        {user && (
                            <>
                                <Link to="/productslist" className="text-gray-200 hover:text-white">Administrador</Link>
                                <Link to="/usuarios" className="text-gray-200 hover:text-white">Usuarios</Link>
                                <Link to="/proveedores" className="text-gray-200 hover:text-white">Proveedores</Link>
                            </>
                        )}
                        <Link to="/cart" className="text-gray-200 hover:text-white">Carrito ({totalItems})</Link>
                        {user ? (
                            <>
                                <Link to="/perfil" className="text-gray-200 hover:text-white">Perfil</Link>
                                <button
                                    onClick={logout}
                                    className="w-full text-left text-red-600 hover:text-red-700 transition duration-200"
                                >
                                    Cerrar Sesión
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="bg-teal-800 text-white py-2 px-4 border border-transparent hover:bg-teal-900 transition duration-200">Iniciar Sesión</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
