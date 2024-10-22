import React, { useEffect, useState } from 'react';

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
  });
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Obtener la lista de proveedores
  useEffect(() => {
    fetchProveedores();
  }, []);

  const fetchProveedores = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/proveedores');
      const data = await response.json();
      setProveedores(data);
    } catch (error) {
      console.error('Error al obtener los proveedores:', error);
    }
  };

  // Manejar los cambios en el formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Agregar un nuevo proveedor
  const addProveedor = async () => {
    try {
      await fetch('http://localhost:3000/api/proveedores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      fetchProveedores();
      setFormData({ nombre: '', email: '', telefono: '', direccion: '' });
    } catch (error) {
      console.error('Error al agregar el proveedor:', error);
    }
  };

  // Editar un proveedor existente
  const editProveedor = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/proveedores/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      fetchProveedores();
      setFormData({ nombre: '', email: '', telefono: '', direccion: '' });
      setEditing(false);
      setEditingId(null);
    } catch (error) {
      console.error('Error al editar el proveedor:', error);
    }
  };

  // Manejar la edición de un proveedor
  const handleEdit = (proveedor) => {
    setFormData(proveedor);
    setEditing(true);
    setEditingId(proveedor.id);
  };

  // Eliminar un proveedor
  const deleteProveedor = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/proveedores/${id}`, {
        method: 'DELETE',
      });
      fetchProveedores();
    } catch (error) {
      console.error('Error al eliminar el proveedor:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CRUD de Proveedores</h1>

      {/* Formulario para agregar o editar proveedores */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editing ? editProveedor(editingId) : addProveedor();
        }}
        className="mb-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="company"
          placeholder="Compañía"
          value={formData.direccion}
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          {editing ? 'Editar Proveedor' : 'Agregar Proveedor'}
        </button>
      </form>

      {/* Lista de proveedores */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Nombre</th>
            <th className="py-2">Email</th>
            <th className="py-2">Teléfono</th>
            <th className="py-2">Compañía</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((proveedor) => (
            <tr key={proveedor.id}>
              <td className="border px-4 py-2">{proveedor.nombre}</td>
              <td className="border px-4 py-2">{proveedor.email}</td>
              <td className="border px-4 py-2">{proveedor.telefono}</td>
              <td className="border px-4 py-2">{proveedor.direccion}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(proveedor)}
                  className="bg-yellow-500 text-white px-2 py-1 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteProveedor(proveedor.id)}
                  className="bg-red-500 text-white px-2 py-1"
                >
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
