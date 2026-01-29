package com.sectorista.repository;

import com.sectorista.model.SectoristaEntidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/*@Repository
public interface SectoristaEntidadRepository extends JpaRepository<SectoristaEntidad, Long> {
    List<SectoristaEntidad> findBySectoristaId(Long sectoristaId);
    void deleteBySectoristaId(Long sectoristaId);
}*/

@Repository
public interface SectoristaEntidadRepository
        extends JpaRepository<SectoristaEntidad, Long> {

    List<SectoristaEntidad> findBySectorista_Id(Long sectoristaId);

    void deleteBySectorista_Id(Long sectoristaId);
}
