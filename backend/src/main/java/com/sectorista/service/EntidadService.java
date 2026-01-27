package com.sectorista.service;

import com.sectorista.model.Entidad;
import com.sectorista.dto.EntidadDTO;
import com.sectorista.repository.EntidadRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EntidadService {

    private final EntidadRepository entidadRepository;

    public EntidadService(EntidadRepository entidadRepository) {
        this.entidadRepository = entidadRepository;
    }

    public List<EntidadDTO> getAllEntidades() {
        return entidadRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<EntidadDTO> getEntidadesActivas() {
        return entidadRepository.findByActivaTrue().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public EntidadDTO getEntidadById(Long id) {
        Entidad entidad = entidadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entidad no encontrada"));
        return toDTO(entidad);
    }

    public EntidadDTO createEntidad(EntidadDTO dto) {
        Entidad entidad = new Entidad();
        entidad.setNombre(dto.getNombre());
        entidad.setDescripcion(dto.getDescripcion());
        entidad.setActiva(dto.getActiva() != null ? dto.getActiva() : true);

        Entidad saved = entidadRepository.save(entidad);
        return toDTO(saved);
    }

    public EntidadDTO updateEntidad(Long id, EntidadDTO dto) {
        Entidad entidad = entidadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entidad no encontrada"));

        entidad.setNombre(dto.getNombre());
        entidad.setDescripcion(dto.getDescripcion());
        entidad.setActiva(dto.getActiva());

        Entidad updated = entidadRepository.save(entidad);
        return toDTO(updated);
    }

    public void deleteEntidad(Long id) {
        entidadRepository.deleteById(id);
    }

    private EntidadDTO toDTO(Entidad entidad) {
        return new EntidadDTO(
                entidad.getId(),
                entidad.getNombre(),
                entidad.getDescripcion(),
                entidad.getActiva()
        );
    }
}
