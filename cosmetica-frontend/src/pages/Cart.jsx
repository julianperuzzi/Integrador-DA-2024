// src/pages/Cart.jsx
import React, { useState } from 'react';
import { useCart } from '../components/CartContext';

const Cart = () => {
    const { cart, removeFromCart, addToCart } = useCart(); // Usar el contexto de carrito
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0); // Calcular el total del carrito

    const handleWhatsApp = () => {
        const cartDetails = cart
            .map(item => `${item.name} (Cantidad: ${item.quantity}) - $${item.price} cada uno`)
            .join('\n');

        const message = `Hola! Aquí está mi pedido:\n\n` +
            `Nombre: ${contactName}\n` +
            `Teléfono: ${contactPhone}\n\n` +
            `Detalles del pedido:\n\n${cartDetails}\n\n` +
            `Total: $${totalAmount.toFixed(2)}\n\n` +
            `Métodos de envío: Envío estándar o Envío exprés (especificar en el mensaje)\n` +
            `Métodos de pago: Tarjeta de crédito, Transferencia bancaria, Efectivo (especificar en el mensaje)\n\n` +
            `Nos preocupamos por su compra y estamos aquí para ayudarle. Si tiene alguna pregunta, no dude en contactarnos. ¡Gracias por elegirnos!`;
        
        const whatsappNumber = "26456369";
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        
        window.open(url, "_blank");
    };

    const handleIncreaseQuantity = (product) => {
        addToCart({ ...product, quantity: 1 }); // Aumenta la cantidad en 1
    };

    const handleDecreaseQuantity = (product) => {
        if (product.quantity > 1) {
            addToCart({ ...product, quantity: -1 }); // Disminuye la cantidad en 1
        } else {
            removeFromCart(product.id); // Si la cantidad es 1, eliminar el producto
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Carrito de Compras</h1>
            {cart.length === 0 ? (
                <p className="text-center">El carrito está vacío.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-3 px-5 border-b text-left">Producto</th>
                                <th className="py-3 px-5 border-b text-left">Cantidad</th>
                                <th className="py-3 px-5 border-b text-left">Subtotal</th>
                                <th className="py-3 px-5 border-b text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(item => (
                                <tr key={item.id} className="hover:bg-gray-100">
                                    <td className="py-3 px-5 border-b flex items-center">
                                        <img src={item.url_image} alt={item.name} className="h-16 w-16 object-cover rounded-md mr-4" />
                                        {item.name}
                                    </td>
                                    <td className="py-3 px-5 border-b text-center">
                                        <button
                                            onClick={() => handleDecreaseQuantity(item)}
                                            className="bg-gray-400 text-white py-1 px-2 rounded hover:bg-gray-500"
                                        >
                                            -
                                        </button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <button
                                            onClick={() => handleIncreaseQuantity(item)}
                                            className="bg-gray-400 text-white py-1 px-2 rounded hover:bg-gray-500"
                                        >
                                            +
                                        </button>
                                    </td>
                                    <td className="py-3 px-5 border-b text-center">
                                        <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                                    </td>
                                    <td className="py-3 px-5 border-b text-center">
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="bg-gray-300 text-black py-1 px-3 rounded hover:bg-gray-400"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h2 className="text-xl font-semibold mt-6">Total: ${totalAmount.toFixed(2)}</h2>
                    
                    {/* Formulario de contacto */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold">Información de Contacto</h3>
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            className="border border-gray-300 rounded px-4 py-2 w-full mt-2"
                        />
                        <input
                            type="text"
                            placeholder="Teléfono"
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                            className="border border-gray-300 rounded px-4 py-2 w-full mt-2"
                        />
                    </div>

                    <button
                        onClick={handleWhatsApp}
                        className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                    >
                        Enviar Pedido por WhatsApp
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
