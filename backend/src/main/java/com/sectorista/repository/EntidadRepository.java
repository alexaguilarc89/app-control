package com.sectorista.repository;

import com.sectorista.model.Entidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EntidadRepository extends JpaRepository<Entidad, Long> {
    List<Entidad> findByActivaTrue();
}
