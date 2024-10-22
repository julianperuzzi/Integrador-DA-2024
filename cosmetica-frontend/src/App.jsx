import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Importar el proveedor de autenticación
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Login from './pages/Login'; // Asegúrate de tener una página de login
import ProductsList from './pages/ProductsList'; // Asegúrate de tener una lista de productos
import Navbar from "./components/Navbar";
import Home from './pages/Home';
import Products from './pages/Products';
import AddUser from './pages/AddUser';
import UsersList from './pages/UsersList';
import EditUser from './pages/EditUser';
import ProtectedRoute from './ProtectedRoute'; // Importar la ruta protegida
import Cart from './pages/Cart';
import { CartProvider } from './components/CartContext';
import Perfil from './pages/Perfil';


function App() {
    return (
        <AuthProvider>
            <CartProvider> 
            <Router>
                <Navbar />
                
                <div className="App">
                    <Routes>
                        <Route path="/*" element={<Home />} />
                        <Route path="/add-product" element={<ProtectedRoute element={<AddProduct />} />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/edit-product/:id" element={<ProtectedRoute element={<EditProduct />} />} />
                        <Route path="/productslist" element={<ProtectedRoute element={<ProductsList />} />} /> 
                        <Route path="/products" element={<Products />} /> 
                        <Route path="/usuarios" element={<ProtectedRoute element={<UsersList />} />} />        
                        <Route path="/usuarios/add" element={<ProtectedRoute element={<AddUser />} />} />     
                        <Route path="/usuarios/edit/:id" element={<ProtectedRoute element={<EditUser />} />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/perfil" element={<Perfil />} />
                    </Routes>
                </div>
            </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
