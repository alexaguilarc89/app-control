package com.sectorista.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

@Slf4j
@Profile("dev")
@Component
public class DatabaseConnectionTest implements CommandLineRunner {

    private final DataSource dataSource;

    public DatabaseConnectionTest(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public void run(String... args) throws Exception {
        testDatabaseConnection();
    }

    public void testDatabaseConnection() {
        try (Connection connection = dataSource.getConnection()) {
            log.info("✅ Conexión a Supabase establecida exitosamente");
            log.info("📊 Base de datos: {}", connection.getCatalog());
            log.info("🔗 URL: {}", connection.getMetaData().getURL());
            log.info("👤 Usuario: {}", connection.getMetaData().getUserName());
            
            // Verificar si existen las tablas
            verifyTables(connection);
            
        } catch (Exception e) {
            log.error("❌ Error al conectar con Supabase: {}", e.getMessage());
            throw new RuntimeException("Error de conexión a la base de datos", e);
        }
    }

    private void verifyTables(Connection connection) {
        try {
            String[] tables = {"entidades", "sectoristas", "sectorista_entidades"};
            
            for (String table : tables) {
                try (Statement stmt = connection.createStatement()) {
                    String query = "SELECT COUNT(*) FROM information_schema.tables WHERE table_name = '" + table + "'";
                    ResultSet rs = stmt.executeQuery(query);
                    
                    if (rs.next() && rs.getInt(1) > 0) {
                        log.info("✅ Tabla '{}' existe en la base de datos", table);
                    } else {
                        log.warn("⚠️ Tabla '{}' no encontrada. Ejecuta el script SQL de creación.", table);
                    }
                }
            }
        } catch (Exception e) {
            log.warn("⚠️ No se pudieron verificar las tablas: {}", e.getMessage());
        }
    }
}
