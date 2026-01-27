package com.sectorista.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EntidadDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private Boolean activa;
}
