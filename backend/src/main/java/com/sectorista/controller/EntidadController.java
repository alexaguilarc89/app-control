package com.sectorista.controller;

import com.sectorista.dto.EntidadDTO;
import com.sectorista.service.EntidadService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/entidades")
@CrossOrigin(origins = "http://localhost:4200")
public class EntidadController {

    private final EntidadService entidadService;

    public EntidadController(EntidadService entidadService) {
        this.entidadService = entidadService;
    }

    @GetMapping
    public ResponseEntity<List<EntidadDTO>> getAllEntidades() {
        return ResponseEntity.ok(entidadService.getAllEntidades());
    }

    @GetMapping("/activas")
    public ResponseEntity<List<EntidadDTO>> getEntidadesActivas() {
        return ResponseEntity.ok(entidadService.getEntidadesActivas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EntidadDTO> getEntidadById(@PathVariable Long id) {
        return ResponseEntity.ok(entidadService.getEntidadById(id));
    }

    @PostMapping
    public ResponseEntity<EntidadDTO> createEntidad(@RequestBody EntidadDTO dto) {
        EntidadDTO created = entidadService.createEntidad(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EntidadDTO> updateEntidad(@PathVariable Long id, @RequestBody EntidadDTO dto) {
        EntidadDTO updated = entidadService.updateEntidad(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEntidad(@PathVariable Long id) {
        entidadService.deleteEntidad(id);
        return ResponseEntity.noContent().build();
    }
}
