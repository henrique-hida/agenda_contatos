package com.agenda.contatos.service;

import com.agenda.contatos.model.Contato;
import com.agenda.contatos.repository.ContatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContatoService {

    @Autowired
    private ContatoRepository contatoRepository;

    public Contato cadastrarContato(Contato contato) {
        if (contato.getTipo() == null || contato.getValor() == null) {
            throw new RuntimeException("Tipo e valor do contato são obrigatórios!");
        }
        return contatoRepository.save(contato);
    }

    public Contato editarContato(Long id, Contato contatoAtualizado) {
        Contato contatoExistente = contatoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contato não encontrado!"));

        contatoExistente.setTipo(contatoAtualizado.getTipo());
        contatoExistente.setValor(contatoAtualizado.getValor());
        contatoExistente.setObservacao(contatoAtualizado.getObservacao());

        return contatoRepository.save(contatoExistente);
    }

    public void excluirContato(Long id) {
        Contato contato = contatoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contato não encontrado!"));
        contatoRepository.delete(contato);
    }

    public List<Contato> listarContatosPorCliente(Long clienteId) {
        return contatoRepository.findByClienteId(clienteId);
    }
}