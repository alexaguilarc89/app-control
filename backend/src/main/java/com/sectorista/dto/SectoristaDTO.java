package com.sectorista.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SectoristaDTO {
    private Long id;
    private String nombres;
    private String apellidos;
    private String telefono;
    private String correo;
    private String unidadOrganica;
    private String estado;
    private List<EntidadDTO> entidades;
}
