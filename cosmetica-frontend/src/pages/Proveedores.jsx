import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Proveedores = () => {
    const [proveedores, setProveedores] = useState([]);
    const navigate = useNavigate();

    // Obtener todos los proveedores
    const getProveedores = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/proveedores');
            setProveedores(response.data);
        } catch (error) {
            console.error('Error al obtener los proveedores', error);
        }
    };

    useEffect(() => {
        getProveedores();
    }, []);

    // Eliminar proveedor
    const deleteProveedor = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/proveedores/${id}`);
            setProveedores(proveedores.filter(proveedor => proveedor.id !== id));
        } catch (error) {
            console.error('Error al eliminar el proveedor', error);
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold my-4">Proveedores</h1>
            <Link to="/proveedores/nuevo" className="bg-green-500 text-white py-2 px-4 rounded">Agregar Proveedor</Link>
            <table className="min-w-full bg-white mt-6 border-collapse">
                <thead>
                    <tr>
                        <th className="py-2">Nombre</th>
                        <th className="py-2">Compañía</th>
                        <th className="py-2">Ciudad</th>
                        <th className="py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {proveedores.map(proveedor => (
                        <tr key={proveedor.id} className="border-b">
                            <td className="py-2">{proveedor.name}</td>
                            <td className="py-2">{proveedor.company}</td>
                            <td className="py-2">{proveedor.city}</td>
                            <td className="py-2">
                                <Link to={`/proveedores/editar/${proveedor.id}`} className="bg-blue-500 text-white py-1 px-3 rounded mr-2">Editar</Link>
                                <button
                                    onClick={() => deleteProveedor(proveedor.id)}
                                    className="bg-red-500 text-white py-1 px-3 rounded">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Proveedores;
