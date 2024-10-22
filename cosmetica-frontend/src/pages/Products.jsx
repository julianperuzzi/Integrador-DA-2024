// src/pages/Products.jsx
import { useState, useEffect } from "react";
import { useCart } from "../components/CartContext"; // Importar el hook de carrito

const Products = () => {
  const { cart, addToCart } = useCart(); // Usar el contexto de carrito
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los productos");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <img
              src={product.url_image}
              alt={product.name}
              className="h-40 w-full object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-gray-600">Stock: {product.stock}</p>
            <button
              onClick={() => addToCart(product)} // Usar la función addToCart del contexto
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Agregar al Carrito
            </button>
          </div>
        ))}
      </div>
      {/* Mostrar el carrito actualizado */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Carrito</h2>
        {cart.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          <ul className="list-disc list-inside">
            {cart.map(item => (
              <li key={item.id}>
                {item.name} - Cantidad: {item.quantity}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Products;
