package com.agenda.contatos.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Data
@Entity
public class Contato {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String tipo;
    private String valor;
    private String observacao;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    @JsonBackReference
    @ToString.Exclude
    private Cliente cliente;
}
