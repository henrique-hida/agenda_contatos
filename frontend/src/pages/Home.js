import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { FaSearch, FaEye } from 'react-icons/fa';
import "../styles/Home.css";

const Home = () => {
    const [clientes, setClientes] = useState([]);
    const [search, setSearch] = useState("");
    const searchInputRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        axios.get('http://localhost:8080/clientes')
            .then(response => setClientes(response.data))
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        if (location.state?.reload) {
            axios.get('http://localhost:8080/clientes')
                .then(response => setClientes(response.data))
                .catch(error => console.error(error));
        }
    }, [location.state]);

    const filteredClientes = clientes.filter(cliente =>
        cliente.nome.toLowerCase().includes(search.toLowerCase()) ||
        cliente.cpf.includes(search)
    );

    const sortedClientes = filteredClientes.sort((a, b) => {
        if (a.nome.toLowerCase() < b.nome.toLowerCase()) {
            return -1;
        }
        if (a.nome.toLowerCase() > b.nome.toLowerCase()) {
            return 1;
        }
        return 0;
    });

    const handleSearchIconClick = () => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    return (
        <div className="home-container">
            <div className="title-container">
                <h1 className="title">Agenda Comércio S/A</h1>
                <div className="underline-title"></div>
            </div>

            <div className="table-container">
                <div className="table-header">
                    <div className="search-container">
                        <FaSearch className="search-icon" onClick={handleSearchIconClick} />
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Pesquise Nome ou CPF"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="search-input"
                        />
                    </div>
                </div>

                <div className="table-scroll-container">
                    <table>
                        <tbody>
                            {sortedClientes.length > 0 ? (
                                sortedClientes.map(cliente => (
                                    <tr key={cliente.id}>
                                        <td>{cliente.nome}</td>
                                        <td>{cliente.cpf}</td>
                                        <td>
                                            {cliente.contatos && cliente.contatos.length > 0
                                                ? cliente.contatos[0].valor 
                                                : "-" 
                                            }
                                        </td>
                                        <td className="eye-icon">
                                            <Link 
                                                to={`/clientes/info/${cliente.id}`}
                                                state={{ cliente }}
                                            >
                                                <FaEye className="view-icon" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                                        Nenhum cliente encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Link to="/clientes/novo" className="floating-button">+</Link>
        </div>
    );
};

export default Home;
