package com.sectorista.controller;

import com.sectorista.dto.SectoristaDTO;
import com.sectorista.service.SectoristaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/sectoristas")
@CrossOrigin(origins = "http://localhost:4200")
public class SectoristaController {

    private final SectoristaService sectoristaService;

    public SectoristaController(SectoristaService sectoristaService) {
        this.sectoristaService = sectoristaService;
    }

    @GetMapping
    public ResponseEntity<List<SectoristaDTO>> getAllSectoristas() {
        return ResponseEntity.ok(sectoristaService.getAllSectoristas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SectoristaDTO> getSectoristaById(@PathVariable Long id) {
        return ResponseEntity.ok(sectoristaService.getSectoristaById(id));
    }

    @PostMapping
    public ResponseEntity<SectoristaDTO> createSectorista(@RequestBody SectoristaDTO dto) {
        SectoristaDTO created = sectoristaService.createSectorista(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SectoristaDTO> updateSectorista(@PathVariable Long id, @RequestBody SectoristaDTO dto) {
        SectoristaDTO updated = sectoristaService.updateSectorista(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSectorista(@PathVariable Long id) {
        sectoristaService.deleteSectorista(id);
        return ResponseEntity.noContent().build();
    }
}
