import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http://localhost:3000/api/users');
            const data = await response.json();
            setUsers(data);
        };
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:3000/api/users/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setUsers(users.filter((user) => user.id !== id));
        }
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 p-5 bg-white shadow-md rounded">
            <h1 className="text-3xl font-bold mb-6 text-center">Lista de Usuarios</h1>
            <Link to="/usuarios/add" className="mb-4 inline-block bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                Agregar Usuario
            </Link>
            <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border-b p-3 text-left">Foto</th>
                        <th className="border-b p-3 text-left">Nombre</th>
                        <th className="border-b p-3 text-left">Email</th>
                        <th className="border-b p-3 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-100 transition-colors">
                            <td className="border-b p-3">
                                <img
                                    src={user.url_photo} // Asegúrate de que esta propiedad existe
                                    alt={user.username} // Descripción alternativa para la imagen
                                    className="h-16 w-12 object-cover" // Estilo para la imagen
                                />
                            </td>
                            <td className="border-b p-3">{user.username}</td>
                            <td className="border-b p-3">{user.email}</td>
                            <td className="border-b p-3">
                                <Link to={`/usuarios/edit/${user.id}`} className="text-blue-600 hover:underline">Editar</Link>
                                <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:underline ml-4">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersList;
