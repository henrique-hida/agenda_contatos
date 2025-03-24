package com.agenda.contatos.controller;

import com.agenda.contatos.model.Contato;
import com.agenda.contatos.service.ContatoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contatos")
public class ContatoController {

    @Autowired
    private ContatoService contatoService;

    @PostMapping
    public Contato cadastrarContato(@RequestBody Contato contato) {
        return contatoService.cadastrarContato(contato);
    }

    @PutMapping("/{id}")
    public Contato editarContato(@PathVariable Long id, @RequestBody Contato contato) {
        return contatoService.editarContato(id, contato);
    }

    @DeleteMapping("/{id}")
    public void excluirContato(@PathVariable Long id) {
        contatoService.excluirContato(id);
    }

    @GetMapping("/cliente/{clienteId}")
    public List<Contato> listarContatosPorCliente(@PathVariable Long clienteId) {
        return contatoService.listarContatosPorCliente(clienteId);
    }
}