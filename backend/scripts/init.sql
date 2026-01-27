-- Script de creación de tablas para Sectorista App en Supabase
-- Ejecutar en el SQL Editor de Supabase

-- Tabla de Entidades
CREATE TABLE IF NOT EXISTS entidades (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(500),
    activa BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Sectoristas
CREATE TABLE IF NOT EXISTS sectoristas (
    id BIGSERIAL PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    unidad_organica VARCHAR(200) NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'Activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de relación Sectorista-Entidad (muchos a muchos)
CREATE TABLE IF NOT EXISTS sectorista_entidades (
    id BIGSERIAL PRIMARY KEY,
    sectorista_id BIGINT NOT NULL REFERENCES sectoristas(id) ON DELETE CASCADE,
    entidad_id BIGINT NOT NULL REFERENCES entidades(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(sectorista_id, entidad_id)
);

-- Crear índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_entidades_activa ON entidades(activa);
CREATE INDEX IF NOT EXISTS idx_sectoristas_correo ON sectoristas(correo);
CREATE INDEX IF NOT EXISTS idx_sectoristas_estado ON sectoristas(estado);
CREATE INDEX IF NOT EXISTS idx_sectorista_entidades_sectorista ON sectorista_entidades(sectorista_id);
CREATE INDEX IF NOT EXISTS idx_sectorista_entidades_entidad ON sectorista_entidades(entidad_id);

-- Habilitar RLS (Row Level Security) si es necesario en producción
-- ALTER TABLE entidades ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE sectoristas ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE sectorista_entidades ENABLE ROW LEVEL SECURITY;

-- Insertar datos de prueba (comentar en producción)
INSERT INTO entidades (nombre, descripcion, activa) VALUES
    ('Alcaldía Municipal', 'Dependencia de gobierno local', true),
    ('Secretaría de Educación', 'Entidad responsable de educación', true),
    ('Secretaría de Salud', 'Entidad responsable de salud', true)
ON CONFLICT DO NOTHING;

INSERT INTO sectoristas (nombres, apellidos, telefono, correo, unidad_organica, estado) VALUES
    ('Juan', 'Pérez García', '3201234567', 'juan.perez@mail.com', 'Dirección de Gestión', 'Activo'),
    ('María', 'González López', '3209876543', 'maria.gonzalez@mail.com', 'Departamento de Fiscalización', 'Activo')
ON CONFLICT DO NOTHING;

-- Ver registro de cambios
CREATE OR REPLACE FUNCTION actualizar_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER actualizar_entidades_timestamp
BEFORE UPDATE ON entidades
FOR EACH ROW
EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER actualizar_sectoristas_timestamp
BEFORE UPDATE ON sectoristas
FOR EACH ROW
EXECUTE FUNCTION actualizar_timestamp();
