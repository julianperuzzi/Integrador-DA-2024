import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({ name: '', email: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`http://localhost:3000/api/users/${id}`);
            const data = await response.json();
            setUser(data);
        };
        fetchUser();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:3000/api/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            navigate('/usuarios');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-md rounded">
            <h1 className="text-3xl font-bold mb-6 text-center">Editar Usuario</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Nombre</label>
                    <input
                        type="text"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Email</label>
                    <input
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Actualizar Usuario
                </button>
            </form>
        </div>
    );
};

export default EditUser;
