import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ClienteForm from './pages/ClienteForm';
import ClienteInfo from './pages/ClienteInfo';
import './styles/App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/clientes" element={<Home />} />
                <Route path="/clientes/novo" element={<ClienteForm />} />
                <Route path="/clientes/editar/:id" element={<ClienteForm />} />
                <Route path="/clientes/info/:id" element={<ClienteInfo />} />
            </Routes>
        </Router>
    );
}

export default App;