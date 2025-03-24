import axios from 'axios';

const API_URL = '/clientes';

export const getClientes = () => axios.get(API_URL);
export const getClienteById = (id) => axios.get(`${API_URL}/${id}`);
export const createCliente = (cliente) => axios.post(API_URL, cliente);
export const updateCliente = (id, cliente) => axios.put(`${API_URL}/${id}`, cliente);
export const deleteCliente = (id) => axios.delete(`${API_URL}/${id}`);