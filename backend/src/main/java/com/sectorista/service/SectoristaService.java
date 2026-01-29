package com.sectorista.service;

import com.sectorista.model.Sectorista;
import com.sectorista.model.Entidad;
import com.sectorista.model.SectoristaEntidad;
import com.sectorista.dto.SectoristaDTO;
import com.sectorista.dto.EntidadDTO;
import com.sectorista.repository.SectoristaRepository;
import com.sectorista.repository.EntidadRepository;
import com.sectorista.repository.SectoristaEntidadRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SectoristaService {

    private final SectoristaRepository sectoristaRepository;
    private final EntidadRepository entidadRepository;
    private final SectoristaEntidadRepository sectoristaEntidadRepository;

    public SectoristaService(SectoristaRepository sectoristaRepository,
                            EntidadRepository entidadRepository,
                            SectoristaEntidadRepository sectoristaEntidadRepository) {
        this.sectoristaRepository = sectoristaRepository;
        this.entidadRepository = entidadRepository;
        this.sectoristaEntidadRepository = sectoristaEntidadRepository;
    }

    public List<SectoristaDTO> getAllSectoristas() {
        return sectoristaRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public SectoristaDTO getSectoristaById(Long id) {
        Sectorista sectorista = sectoristaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sectorista no encontrado"));
        return toDTO(sectorista);
    }

    @Transactional
    public SectoristaDTO createSectorista(SectoristaDTO dto) {
        Sectorista sectorista = new Sectorista();
        sectorista.setNombres(dto.getNombres());
        sectorista.setApellidos(dto.getApellidos());
        sectorista.setTelefono(dto.getTelefono());
        sectorista.setCorreo(dto.getCorreo());
        sectorista.setUnidadOrganica(dto.getUnidadOrganica());
        sectorista.setEstado(dto.getEstado());

        Sectorista saved = sectoristaRepository.save(sectorista);

        // Agregar entidades si existen
        if (dto.getEntidades() != null && !dto.getEntidades().isEmpty()) {
            for (EntidadDTO entidadDTO : dto.getEntidades()) {
                Entidad entidad = entidadRepository.findById(entidadDTO.getId())
                        .orElseThrow(() -> new RuntimeException("Entidad no encontrada"));
                
                SectoristaEntidad se = new SectoristaEntidad();
                se.setSectorista(saved);
                se.setEntidad(entidad);
                sectoristaEntidadRepository.save(se);
            }
        }

        return toDTO(saved);
    }

    @Transactional
    public SectoristaDTO updateSectorista(Long id, SectoristaDTO dto) {
        Sectorista sectorista = sectoristaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sectorista no encontrado"));

        sectorista.setNombres(dto.getNombres());
        sectorista.setApellidos(dto.getApellidos());
        sectorista.setTelefono(dto.getTelefono());
        sectorista.setCorreo(dto.getCorreo());
        sectorista.setUnidadOrganica(dto.getUnidadOrganica());
        sectorista.setEstado(dto.getEstado());

        Sectorista updated = sectoristaRepository.save(sectorista);

        // Actualizar entidades
        sectoristaEntidadRepository.deleteBySectoristaId(id);
        
        if (dto.getEntidades() != null && !dto.getEntidades().isEmpty()) {
            for (EntidadDTO entidadDTO : dto.getEntidades()) {
                Entidad entidad = entidadRepository.findById(entidadDTO.getId())
                        .orElseThrow(() -> new RuntimeException("Entidad no encontrada"));
                
                SectoristaEntidad se = new SectoristaEntidad();
                se.setSectorista(updated);
                se.setEntidad(entidad);
                sectoristaEntidadRepository.save(se);
            }
        }

        return toDTO(updated);
    }

    @Transactional
    public void deleteSectorista(Long id) {
        sectoristaEntidadRepository.deleteBySectoristaId(id);
        sectoristaRepository.deleteById(id);
    }

    private SectoristaDTO toDTO(Sectorista sectorista) {
        List<SectoristaEntidad> entidades = sectoristaEntidadRepository
                .findBySectoristaId(sectorista.getId());
        
        List<EntidadDTO> entidadesDTO = entidades.stream()
                .map(se -> new EntidadDTO(
                        se.getEntidad().getId(),
                        se.getEntidad().getNombre(),
                        se.getEntidad().getDescripcion(),
                        se.getEntidad().getActiva()
                ))
                .collect(Collectors.toList());

        return new SectoristaDTO(
                sectorista.getId(),
                sectorista.getNombres(),
                sectorista.getApellidos(),
                sectorista.getTelefono(),
                sectorista.getCorreo(),
                sectorista.getUnidadOrganica(),
                sectorista.getEstado(),
                entidadesDTO
        );
    }
}
