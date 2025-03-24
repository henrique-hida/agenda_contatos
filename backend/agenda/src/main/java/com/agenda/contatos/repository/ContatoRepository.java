package com.agenda.contatos.repository;

import com.agenda.contatos.model.Contato;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ContatoRepository extends JpaRepository<Contato, Long> {
    List<Contato> findByClienteId(Long clienteId);
}
