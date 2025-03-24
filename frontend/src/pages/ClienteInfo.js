import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaTrash, FaEdit, FaArrowLeft } from 'react-icons/fa';
import "../styles/ClienteInfo.css";

const ClienteInfo = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [cliente, setCliente] = useState(state?.cliente);

    if (!cliente) return <div>Cliente não encontrado</div>;

    const handleDeleteCliente = async () => {
        try {
            await fetch(`http://localhost:8080/clientes/${cliente.id}`, { method: 'DELETE' });
            navigate('/', { state: { reload: true } });
        } catch (error) {
            console.error("Erro ao excluir cliente:", error);
        }
    };

    const handleDeleteContato = async (contatoId) => {
        try {
            await fetch(`http://localhost:8080/contatos/${contatoId}`, { method: 'DELETE' });
            const updatedContatos = cliente.contatos.filter(c => c.id !== contatoId);
            setCliente(prevCliente => ({ ...prevCliente, contatos: updatedContatos }));
            if (updatedContatos.length === 0) {
                navigate('/', { state: { reload: true } });
            }
        } catch (error) {
            console.error("Erro ao excluir contato", error);
        }
    };

    const handleEditCliente = () => {
        navigate(`/clientes/editar/${cliente.id}`, { state: { cliente } });
    };

    return (
        <div className="cliente-info-container">
            <h1 className="title">Informações</h1>
            <div className="info-content">
                <div className="left-column">
                    <h2 className="subtitle">Geral</h2>
                    <div className="info-group">
                        <p className="info-label">Nome</p>
                        <p className="info-value">{cliente.nome}</p>
                    </div>
                    <div className="info-row">
                        <div className="info-group">
                            <p className="info-label">CPF</p>
                            <p className="info-value">{cliente.cpf}</p>
                        </div>
                        <div className="info-group">
                            <p className="info-label">Nascimento</p>
                            <p className="info-value">{new Date(cliente.dataNascimento).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="info-group">
                        <p className="info-label">Endereço</p>
                        <p className="info-value">{cliente.endereco}</p>
                    </div>
                </div>
                <div className="right-column">
                    <h2 className="subtitle">Contatos</h2>
                    <div className="scroll-container">
                        <div className="contatos-list">
                            {cliente.contatos.map(contato => (
                                <div key={contato.id} className="contato-card">
                                    <button 
                                        className="delete-contato-btn"
                                        onClick={() => handleDeleteContato(contato.id)}
                                    >
                                        <FaTrash />
                                    </button>
                                    <div className="contato-info">
                                        <p className="contato-label">{contato.tipo === 'email' ? 'E-mail' : 'Telefone'}</p>
                                        <p className="contato-valor">{contato.valor}</p>
                                        {contato.observacao && (
                                            <p className="contato-observacao">Obs: {contato.observacao}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="action-buttons">
                <button className="btn-retornar" onClick={() => navigate('/')}> <FaArrowLeft /> Retornar </button>
                <button className="btn-editar" onClick={handleEditCliente}> <FaEdit /> Editar </button>
                <button className="btn-excluir" onClick={handleDeleteCliente}> <FaTrash /> Excluir Cliente </button>
            </div>
        </div>
    );
};

export default ClienteInfo;
