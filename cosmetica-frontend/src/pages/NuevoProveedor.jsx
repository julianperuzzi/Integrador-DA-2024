import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NuevoProveedor = () => {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        url_photo: '',
        city: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/proveedores', formData);
            navigate('/proveedores');
        } catch (error) {
            console.error('Error al agregar el proveedor', error);
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold my-4">Agregar Proveedor</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block">Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block">Compañía:</label>
                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full border p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block">URL de la Foto:</label>
                    <input
                        type="text"
                        name="url_photo"
                        value={formData.url_photo}
                        onChange={handleChange}
                        className="w-full border p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block">Ciudad:</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full border p-2"
                    />
                </div>
                <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">Guardar Proveedor</button>
            </form>
        </div>
    );
};

export default NuevoProveedor;
