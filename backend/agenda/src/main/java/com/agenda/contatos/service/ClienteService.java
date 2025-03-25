package com.agenda.contatos.service;

import com.agenda.contatos.model.Cliente;
import com.agenda.contatos.model.Contato;
import com.agenda.contatos.repository.ClienteRepository;
import com.agenda.contatos.repository.ContatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ContatoRepository contatoRepository;

    public Cliente cadastrarCliente(Cliente cliente) {
        if (clienteRepository.findByCpf(cliente.getCpf()).isPresent()) {
            throw new RuntimeException("CPF já cadastrado!");
        }

        if (cliente.getContatos() != null) {
            cliente.getContatos().forEach(contato -> contato.setCliente(cliente));
        }

        return clienteRepository.save(cliente);
    }

    public Cliente editarCliente(Long id, Cliente clienteAtualizado) {
        Cliente clienteExistente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado!"));

        if (!clienteExistente.getCpf().equals(clienteAtualizado.getCpf())) {
            if (clienteRepository.findByCpf(clienteAtualizado.getCpf())
                    .filter(c -> !c.getId().equals(id)).isPresent()) {
                throw new RuntimeException("CPF já cadastrado em outro cliente!");
            }
        }

        clienteExistente.setNome(clienteAtualizado.getNome());
        clienteExistente.setCpf(clienteAtualizado.getCpf());
        clienteExistente.setDataNascimento(clienteAtualizado.getDataNascimento());
        clienteExistente.setEndereco(clienteAtualizado.getEndereco());

        if (clienteAtualizado.getContatos() != null) {
            for (Contato novoContato : clienteAtualizado.getContatos()) {
                if (novoContato.getId() != null) {
                    Contato contatoExistente = contatoRepository.findById(novoContato.getId())
                            .orElseThrow(() -> new RuntimeException("Contato não encontrado!"));
                    contatoExistente.setTipo(novoContato.getTipo());
                    contatoExistente.setValor(novoContato.getValor());
                    contatoExistente.setObservacao(novoContato.getObservacao());
                    contatoRepository.save(contatoExistente);
                } else {
                    novoContato.setCliente(clienteExistente);
                    contatoRepository.save(novoContato);
                }
            }
        }

        return clienteRepository.save(clienteExistente);
    }

    public void excluirCliente(Long id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado!"));
        clienteRepository.delete(cliente);
    }

    public List<Cliente> listarClientes() {
        return clienteRepository.findAll();
    }

    public List<Cliente> buscarClientes(String nome, String cpf) {
        if (nome != null) {
            return clienteRepository.findByNomeContainingIgnoreCase(nome);
        } else if (cpf != null) {
            return clienteRepository.findByCpf(cpf)
                    .map(List::of)
                    .orElseThrow(() -> new RuntimeException("Cliente não encontrado!"));
        } else {
            return clienteRepository.findAll();
        }
    }
}