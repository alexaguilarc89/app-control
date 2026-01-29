package com.sectorista.repository;

import com.sectorista.model.SectoristaEntidad;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SectoristaEntidadRepository extends JpaRepository<SectoristaEntidad, Long> {

    @Query("""
        SELECT se
        FROM SectoristaEntidad se
        WHERE se.sectorista.id = :sectoristaId
    """)
    List<SectoristaEntidad> findBySectoristaId(@Param("sectoristaId") Long sectoristaId);

    @Modifying
    @Query("""
        DELETE FROM SectoristaEntidad se
        WHERE se.sectorista.id = :sectoristaId
    """)
    void deleteBySectoristaId(@Param("sectoristaId") Long sectoristaId);
}
