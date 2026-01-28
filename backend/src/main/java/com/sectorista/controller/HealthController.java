package com.sectorista.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.sql.DataSource;
import java.sql.Connection;

@RestController
@RequestMapping("/api")
public class HealthController {

    @Autowired
    private DataSource dataSource;

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Backend está levantado correctamente");
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Test OK - Servidor respondiendo");
    }

    @GetMapping("/db-health")
    public ResponseEntity<String> dbHealth() {
        try {
            Connection connection = dataSource.getConnection();
            connection.close();
            return ResponseEntity.ok("✓ Conexión a Supabase exitosa");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("✗ Error de conexión: " + e.getMessage());
        }
    }
}
