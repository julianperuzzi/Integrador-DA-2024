// src/pages/Perfil.jsx
import React from 'react';
import { useAuth } from '../AuthContext'; // Importar el contexto de autenticación

const Perfil = () => {
    const { user } = useAuth(); // Obtener la información del usuario autenticado

    if (!user) {
        return <p>Debes iniciar sesión para ver esta página.</p>; // Mensaje si no hay usuario autenticado
    }

    return (
        <div className="min-h-screen bg-gray-200 p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Perfil del Usuario</h1>


            <div className="flex flex-row bg-white shadow-md items-center mx-auto w-7/12">
            {user.url_photo && (
                    <img 
                        src={user.url_photo} 
                        alt="Foto de perfil" 
                        className="w-96 h-96 object-cover" 
                    />
                )}
               <div className='flex flex-col ml-6'>
                <h2 className="text-xl font-semibold">Información Personal</h2>
                <p><strong>Nombre:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
   
                <div className="mt-6">
                    <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
                        Editar Información
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Perfil;
