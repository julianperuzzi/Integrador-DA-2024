// src/components/ProductModal.jsx
import React from "react";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold">{product.name}</h2>
        <img
          src={product.url_image}
          alt={product.name}
          className="h-48 w-full object-cover rounded-md mb-4"
        />
        <p className="text-gray-600">{product.description}</p>
        <p className="text-gray-800 font-bold mt-4">Precio: ${product.price}</p>
        <p className="text-gray-600">Stock: {product.stock}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
