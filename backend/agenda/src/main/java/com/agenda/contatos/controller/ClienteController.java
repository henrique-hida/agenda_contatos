package com.agenda.contatos.controller;

import com.agenda.contatos.model.Cliente;
import com.agenda.contatos.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @PostMapping
    public Cliente cadastrarCliente(@RequestBody Cliente cliente) {
        System.out.println("Dados recebidos: " + cliente);
        return clienteService.cadastrarCliente(cliente);
    }

    @PutMapping("/{id}")
    public Cliente editarCliente(@PathVariable Long id, @RequestBody Cliente cliente) {
        return clienteService.editarCliente(id, cliente);
    }

    @DeleteMapping("/{id}")
    public void excluirCliente(@PathVariable Long id) {
        clienteService.excluirCliente(id);
    }

    @GetMapping
    public List<Cliente> listarClientes() {
        return clienteService.listarClientes();
    }

    @GetMapping("/buscar")
    public List<Cliente> buscarClientes(
            @RequestParam(required = false) String nome,
            @RequestParam(required = false) String cpf) {
        return clienteService.buscarClientes(nome, cpf);
    }
}