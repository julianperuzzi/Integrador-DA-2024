const express = require('express');
const cors = require('cors');
const db = require('./db'); // Conexión a la base de datos
const app = express();
const port = 3000;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para interpretar JSON
app.use(express.json());

// Ruta de inicio
app.get('/', (req, res) => {
    res.send('API de productos y usuarios');
});

// --------------------- Rutas de Productos --------------------- //

// Ruta para obtener todos los productos (incluyendo el nombre del proveedor)
app.get('/api/products', (req, res) => {
    const query = `
        SELECT products.*, proveedores.name AS proveedor_name
        FROM products
        LEFT JOIN proveedores ON products.proveedor_id = proveedores.id
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los productos:', err);
            return res.status(500).json({ error: 'Error al obtener los productos' });
        }
        res.json(results);
    });
});

// Ruta para agregar un nuevo producto
app.post('/api/products', (req, res) => {
    const { name, description, price, stock, proveedor_id } = req.body;

    // Validación de los datos recibidos
    if (!name || !description || price === undefined || stock === undefined || !proveedor_id) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const query = 'INSERT INTO products (name, description, price, stock, proveedor_id) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, description, price, stock, proveedor_id], (err, results) => {
        if (err) {
            console.error('Error al agregar el producto:', err.sqlMessage || err.message);
            return res.status(500).json({ error: 'Error al agregar el producto' });
        }
        res.status(201).json({ message: 'Producto agregado con éxito', productId: results.insertId });
    });
});

// Ruta para editar un producto existente
app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock, proveedor_id } = req.body;

    // Validación de los datos recibidos
    if (!name || !description || price === undefined || stock === undefined || !proveedor_id) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const query = 'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, proveedor_id = ? WHERE id = ?';
    db.query(query, [name, description, price, stock, proveedor_id, id], (err, results) => {
        if (err) {
            console.error('Error al editar el producto:', err.sqlMessage || err.message);
            return res.status(500).json({ error: 'Error al editar el producto' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto editado con éxito' });
    });
});


// Ruta para eliminar un producto
app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM products WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar el producto:', err.sqlMessage || err.message);
            return res.status(500).json({ error: 'Error al eliminar el producto' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado con éxito' });
    });
});

// --------------------- Rutas de Usuarios --------------------- //

// Ruta para obtener todos los usuarios
app.get('/api/users', (req, res) => {
    const query = 'SELECT id, username, email, url_photo, created_at FROM users';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los usuarios:', err);
            return res.status(500).json({ error: 'Error al obtener los usuarios' });
        }
        res.json(results);
    });
});

// Ruta para obtener un usuario específico
app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener el usuario:', err);
            return res.status(500).json({ error: 'Error al obtener el usuario' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(results[0]);
    });
});

// Ruta para agregar un nuevo usuario
app.post('/api/users', (req, res) => {
    const { username, email, password, url_photo } = req.body;

    // Validación de los datos recibidos
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const query = 'INSERT INTO users (username, email, password, url_photo) VALUES (?, ?, ?, ?)';
    db.query(query, [username, email, password, url_photo], (err, results) => {
        if (err) {
            console.error('Error al agregar el usuario:', err.sqlMessage || err.message);
            return res.status(500).json({ error: 'Error al agregar el usuario' });
        }
        res.status(201).json({ message: 'Usuario agregado con éxito', userId: results.insertId });
    });
});

// Ruta para editar un usuario existente
app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { username, email, password, url_photo } = req.body;

    // Validación de los datos recibidos
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const query = 'UPDATE users SET username = ?, email = ?, password = ?, url_photo = ? WHERE id = ?';
    db.query(query, [username, email, password, url_photo, id], (err, results) => {
        if (err) {
            console.error('Error al editar el usuario:', err.sqlMessage || err.message);
            return res.status(500).json({ error: 'Error al editar el usuario' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario editado con éxito' });
    });
});

// Ruta para eliminar un usuario
app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar el usuario:', err.sqlMessage || err.message);
            return res.status(500).json({ error: 'Error al eliminar el usuario' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado con éxito' });
    });
});

// Ruta para iniciar sesión
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error en el servidor' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const user = results[0];
        // Aquí puedes agregar verificación de contraseña con bcrypt o similar
        if (user.password !== password) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        res.json({ message: 'Inicio de sesión exitoso', user });
    });
});

// --------------------- Rutas de Proveedores --------------------- //

// Ruta para obtener todos los proveedores
app.get('/api/proveedores', (req, res) => {
    const query = 'SELECT * FROM proveedores';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los proveedores:', err);
            return res.status(500).json({ error: 'Error al obtener los proveedores' });
        }
        res.json(results);
    });
});

// Ruta para obtener un proveedor específico
app.get('/api/proveedores/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM proveedores WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener el proveedor:', err);
            return res.status(500).json({ error: 'Error al obtener el proveedor' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }
        res.json(results[0]);
    });
});

// Ruta para agregar un nuevo proveedor
app.post('/api/proveedores', (req, res) => {
    const { name, contact_info } = req.body;

    // Validación de los datos recibidos
    if (!name || !contact_info) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const query = 'INSERT INTO proveedores (name, contact_info) VALUES (?, ?)';
    db.query(query, [name, contact_info], (err, results) => {
        if (err) {
            console.error('Error al agregar el proveedor:', err.sqlMessage || err.message);
            return res.status(500).json({ error: 'Error al agregar el proveedor' });
        }
        res.status(201).json({ message: 'Proveedor agregado con éxito', proveedorId: results.insertId });
    });
});

// Ruta para editar un proveedor existente
app.put('/api/proveedores/:id', (req, res) => {
    const { id } = req.params;
    const { name, contact_info } = req.body;

    // Validación de los datos recibidos
    if (!name || !contact_info) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const query = 'UPDATE proveedores SET name = ?, contact_info = ? WHERE id = ?';
    db.query(query, [name, contact_info, id], (err, results) => {
        if (err) {
            console.error('Error al editar el proveedor:', err.sqlMessage || err.message);
            return res.status(500).json({ error: 'Error al editar el proveedor' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }
        res.json({ message: 'Proveedor editado con éxito' });
    });
});

// Ruta para eliminar un proveedor
app.delete('/api/proveedores/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM proveedores WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar el proveedor:', err.sqlMessage || err.message);
            return res.status(500).json({ error: 'Error al eliminar el proveedor' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }
        res.json({ message: 'Proveedor eliminado con éxito' });
    });
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
