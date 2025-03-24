import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import '../styles/ClienteForm.css';

const ClienteForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { state } = useLocation();

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [endereco, setEndereco] = useState('');
    const [contatos, setContatos] = useState([{ tipo: '', valor: '', observacao: '' }]);
    const [cpfValido, setCpfValido] = useState(true); 
    useEffect(() => {
        if (id && state?.cliente) {
            const cliente = state.cliente;
            setNome(cliente.nome);
            setCpf(cliente.cpf);
            setDataNascimento(cliente.dataNascimento);
            setEndereco(cliente.endereco);
            setContatos(cliente.contatos || [{ tipo: '', valor: '', observacao: '' }]);
        }
    }, [id, state]);

    const formatarCPF = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    };

    const validarCPF = (cpf) => {
        cpf = cpf.replace(/\D/g, ''); 

        if (cpf.length !== 11) return false;

        if (/^(\d)\1{10}$/.test(cpf)) return false;

        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(9))) return false;

        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(10))) return false;

        return true;
    };

    const handleCpfChange = (e) => {
        const formattedCpf = formatarCPF(e.target.value);
        setCpf(formattedCpf);
        setCpfValido(validarCPF(formattedCpf));
    };

    const validarDataNascimento = (date) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(date)) return false;
        const data = new Date(date);
        const hoje = new Date();
        return data < hoje;
    };

    const handleDataNascimentoChange = (e) => {
        const data = e.target.value;
        if (validarDataNascimento(data)) {
            setDataNascimento(data);
        } else {
            alert('Data de nascimento inválida.');
        }
    };

    const adicionarContato = () => {
        setContatos([...contatos, { tipo: '', valor: '', observacao: '' }]);
    };

    const handleContatoChange = (index, field, value) => {
        const novosContatos = [...contatos];
        novosContatos[index][field] = value;
        setContatos(novosContatos);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validarCPF(cpf)) {
            alert('CPF inválido. Por favor, insira um CPF válido.');
            return;
        }

        const novoCliente = {
            nome,
            cpf,
            dataNascimento,
            endereco,
            contatos: contatos.filter(contato => contato.tipo && contato.valor),
        };

        console.log("Dados a serem enviados:", novoCliente);

        const requestMethod = id ? axios.put : axios.post;

        requestMethod(`http://localhost:8080/clientes${id ? '/' + id : ''}`, novoCliente)
            .then(response => {
                navigate(`/clientes/info/${response.data.id}`, { state: { cliente: response.data } });
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.message.includes('CPF já cadastrado')) {
                    alert('Este CPF já está cadastrado.');
                } else {
                    alert('Erro ao cadastrar ou editar cliente.');
                }
            });
    };

    return (
        <div className="cliente-form-container">
            <div className="title-container">
                <h1 className="title" style={{ whiteSpace: 'pre-line' }}>
                    {id ? 'Editar Cliente' : 'Cadastre um\nNovo Cliente'}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label>Nome</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Nome completo"
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>CPF</label>
                        <input
                            type="text"
                            value={cpf}
                            onChange={handleCpfChange}
                            placeholder="000.000.000-00"
                            maxLength="14"
                            required
                        />
                        {!cpfValido && <span className="error-message">CPF inválido</span>}
                    </div>
                    <div className="form-group">
                        <label>Data de Nascimento</label>
                        <input
                            type="date"
                            value={dataNascimento}
                            onChange={handleDataNascimentoChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Endereço</label>
                    <input
                        type="text"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                        placeholder="Endereço completo"
                        required
                    />
                </div>

                {contatos.map((contato, index) => (
                    <div key={index} className="contato-group">
                        <div className="form-group">
                            <label>Selecione o tipo de contato</label>
                            <select
                                value={contato.tipo}
                                onChange={(e) => handleContatoChange(index, 'tipo', e.target.value)}
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="email">Email</option>
                                <option value="telefone">Telefone</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>{contato.tipo === 'email' ? 'Email' : 'Telefone'}</label>
                            <input
                                type={contato.tipo === 'email' ? 'email' : 'tel'}
                                value={contato.valor}
                                onChange={(e) => handleContatoChange(index, 'valor', e.target.value)}
                                placeholder={contato.tipo === 'email' ? 'exemplo@email.com' : '(00) 00000-0000'}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Observações</label>
                            <textarea
                                value={contato.observacao}
                                onChange={(e) => handleContatoChange(index, 'observacao', e.target.value)}
                                placeholder="Observações"
                            />
                        </div>
                    </div>
                ))}

                <button type="button" onClick={adicionarContato} className="add-contato-button">
                    Adicionar outro contato (opcional)
                </button>

                <div className="form-buttons">
                    <button type="button" onClick={() => navigate('/')} className="cancel-button">Cancelar</button>
                    <button type="submit" className="save-button">Salvar</button>
                </div>
            </form>
        </div>
    );
};

export default ClienteForm;