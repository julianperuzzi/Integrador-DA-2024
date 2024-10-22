import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { name, email };

        const response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            navigate('/usuarios');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-md rounded">
            <h1 className="text-3xl font-bold mb-6 text-center">Agregar Usuario</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Nombre</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Agregar Usuario
                </button>
            </form>
        </div>
    );
};

export default AddUser;
