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

    public SectoristaService(
            SectoristaRepository sectoristaRepository,
            EntidadRepository entidadRepository,
            SectoristaEntidadRepository sectoristaEntidadRepository) {
        this.sectoristaRepository = sectoristaRepository;
        this.entidadRepository = entidadRepository;
        this.sectoristaEntidadRepository = sectoristaEntidadRepository;
    }

    // =========================
    // READ
    // =========================

    @Transactional(readOnly = true)
    public List<SectoristaDTO> getAllSectoristas() {
        return sectoristaRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public SectoristaDTO getSectoristaById(Long id) {
        Sectorista sectorista = sectoristaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sectorista no encontrado"));
        return toDTO(sectorista);
    }

    // =========================
    // CREATE
    // =========================

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

        saveEntidades(saved, dto.getEntidades());

        return toDTO(saved);
    }

    // =========================
    // UPDATE
    // =========================

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

        // Reemplaza relaciones correctamente
        sectoristaEntidadRepository.deleteBySectorista_Id(id);
        saveEntidades(updated, dto.getEntidades());

        return toDTO(updated);
    }

    // =========================
    // DELETE
    // =========================

    @Transactional
    public void deleteSectorista(Long id) {
        sectoristaEntidadRepository.deleteBySectorista_Id(id);
        sectoristaRepository.deleteById(id);
    }

    // =========================
    // PRIVATE HELPERS
    // =========================

    private void saveEntidades(Sectorista sectorista, List<EntidadDTO> entidades) {
        if (entidades == null || entidades.isEmpty()) return;

        for (EntidadDTO dto : entidades) {
            Entidad entidad = entidadRepository.findById(dto.getId())
                    .orElseThrow(() ->
                            new RuntimeException("Entidad no encontrada con ID: " + dto.getId())
                    );

            SectoristaEntidad se = new SectoristaEntidad();
            se.setSectorista(sectorista);
            se.setEntidad(entidad);

            sectoristaEntidadRepository.save(se);
        }
    }

    @Transactional(readOnly = true)
    private SectoristaDTO toDTO(Sectorista sectorista) {

        List<SectoristaEntidad> relaciones =
                sectoristaEntidadRepository.findBySectorista_Id(sectorista.getId());

        List<EntidadDTO> entidadesDTO = relaciones.stream()
                .map(se -> {
                    Entidad e = se.getEntidad();
                    return new EntidadDTO(
                            e.getId(),
                            e.getNombre(),
                            e.getDescripcion(),
                            e.getActiva()
                    );
                })
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
