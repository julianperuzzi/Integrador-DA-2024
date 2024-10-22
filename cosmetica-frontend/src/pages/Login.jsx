import { useState } from "react";
import { useAuth } from '../AuthContext'; // Importar el contexto de autenticación
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth(); // Obtener la función login del contexto
  const navigate = useNavigate(); // Usar el hook para redirigir
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error message

    // Validar campos vacíos
    if (!formData.email || !formData.password) {
      setError("Por favor, completa todos los campos");
      setLoading(false);
      return;
    }

    console.log('Enviando:', formData);

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        // Guardar la información del usuario en el contexto
        login(data.user); // Aquí asumimos que la respuesta contiene un objeto `user`
        
        // Redirigir a la página de productos
        navigate("/products");
      } else {
        // Manejo de errores
        setError(data.message || "Error en el login");
      }
    } catch (err) {
      setError("Error en la conexión con el servidor");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Contraseña
            </label>
            <input
              type="password" // Asegúrate de que sea de tipo password
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
