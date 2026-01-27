package com.sectorista.repository;

import com.sectorista.model.Sectorista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface SectoristaRepository extends JpaRepository<Sectorista, Long> {
    Optional<Sectorista> findByCorreo(String correo);
    List<Sectorista> findByEstado(String estado);
}
