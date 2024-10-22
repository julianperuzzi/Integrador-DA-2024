// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../components/CartContext'; // Importar el hook de carrito
import { useAuth } from '../AuthContext'; // Importar el hook de autenticación

const Navbar = () => {
    const { cart } = useCart(); // Usar el contexto de carrito
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0); // Contar total de ítems en el carrito
    const { user, logout } = useAuth(); // Obtener información del usuario autenticado

    return (
        <nav className="bg-teal-600/90 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">

                <div className="flex items-center">
                        <Link to="/" className="font-bold text-white hover:text-gray-300 px-4 pr-16 text-2xl">Cosmetica AR</Link>                        
                    </div>

                    <div className="flex items-center">                        
                        <div className="hidden sm:flex sm:space-x-8">
                            <Link to="/" className="text-gray-300 hover:text-white">Inicio</Link>
                            <Link to="/products" className="text-gray-300 hover:text-white">Productos</Link>
                            <Link to="/productslist" className="text-gray-300 hover:text-white">Administrador</Link>
                            <Link to="/usuarios" className="text-gray-300 hover:text-white">Usuarios</Link>
                            {/* Mostrar el total de productos en el carrito */}
                            <Link to="/cart" className="text-gray-300 hover:text-white">Carrito ({totalItems})</Link>
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
                                <Link to="/login" className="bg-teal-800 text-white py-2 px-4 border border-transparent hover:bg-teal-900 transition duration-200">Iniciar Sesión</Link>
                                
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
