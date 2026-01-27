# Sectorista Backend - Spring Boot 3.3 con Java 21

Backend REST API para la aplicación de gestión de Sectoristas.

## Características

- ✅ Spring Boot 3.3 con Java 21
- ✅ Spring Data JPA con Hibernate
- ✅ API REST con CORS habilitado
- ✅ Soporte para múltiples bases de datos (H2, MySQL, PostgreSQL)
- ✅ Gestión de Sectoristas y Entidades
- ✅ Transacciones y persistencia en base de datos
- ✅ Lombok para reducir código boilerplate

## Requisitos

- **Java 21** (JDK)
- **Maven 3.8+**
- **Git**

## Instalación

### 1. Clonar o descargar el proyecto

```bash
cd backend
```

### 2. Compilar el proyecto

```bash
mvn clean install
```

### 3. Ejecutar la aplicación

```bash
mvn spring-boot:run
```

La aplicación estará disponible en `http://localhost:8080`

## Configuración de Base de Datos

### Opción 1: H2 (Por defecto - Desarrollo)

Por defecto usa H2 en memoria. Acceso a consola en: `http://localhost:8080/h2-console`

### Opción 2: MySQL (Recomendado para producción)

Editar `src/main/resources/application.properties`:

```properties
# Descomenta estas líneas y comenta las de H2
spring.datasource.url=jdbc:mysql://localhost:3306/sectorista_db
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.username=root
spring.datasource.password=tu_contraseña
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
```

Crear la base de datos:
```sql
CREATE DATABASE sectorista_db;
```

### Opción 3: PostgreSQL

Editar `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/sectorista_db
spring.datasource.driver-class-name=org.postgresql.Driver
spring.datasource.username=postgres
spring.datasource.password=tu_contraseña
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQL95Dialect
spring.jpa.hibernate.ddl-auto=update
```

### Opción 4: AWS RDS

```properties
spring.datasource.url=jdbc:mysql://your-rds-endpoint:3306/sectorista_db
spring.datasource.username=admin
spring.datasource.password=your_password
```

## API Endpoints

### Sectoristas

```
GET    /api/sectoristas           - Obtener todos los sectoristas
GET    /api/sectoristas/{id}      - Obtener sectorista por ID
POST   /api/sectoristas           - Crear nuevo sectorista
PUT    /api/sectoristas/{id}      - Actualizar sectorista
DELETE /api/sectoristas/{id}      - Eliminar sectorista
```

### Entidades

```
GET    /api/entidades             - Obtener todas las entidades
GET    /api/entidades/activas     - Obtener entidades activas
GET    /api/entidades/{id}        - Obtener entidad por ID
POST   /api/entidades             - Crear nueva entidad
PUT    /api/entidades/{id}        - Actualizar entidad
DELETE /api/entidades/{id}        - Eliminar entidad
```

## Ejemplo de Solicitud

### Crear Sectorista

```bash
curl -X POST http://localhost:8080/api/sectoristas \
  -H "Content-Type: application/json" \
  -d '{
    "nombres": "Juan",
    "apellidos": "Pérez",
    "telefono": "1234567890",
    "correo": "juan@example.com",
    "unidadOrganica": "Dirección de Registro de Personal Activo",
    "estado": "Activo",
    "entidades": [
      {"id": 1, "nombre": "Entidad A", "descripcion": null, "activa": true}
    ]
  }'
```

## Integración con Angular

En tu proyecto Angular, usa `HttpClient` para llamar a la API:

```typescript
import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient) {}

getSectoristas() {
  return this.http.get('/api/sectoristas');
}

createSectorista(sectorista: SectoristaDTO) {
  return this.http.post('/api/sectoristas', sectorista);
}
```

Configura el `environment.ts`:

```typescript
export const environment = {
  apiUrl: 'http://localhost:8080'
};
```

## Estructura del Proyecto

```
src/main/java/com/sectorista/
├── SectoristasApplication.java      # Clase principal
├── model/                           # Entidades JPA
│   ├── Sectorista.java
│   ├── Entidad.java
│   └── SectoristaEntidad.java
├── dto/                             # DTOs para comunicación
│   ├── SectoristaDTO.java
│   └── EntidadDTO.java
├── repository/                      # Interfaces JPA
│   ├── SectoristaRepository.java
│   ├── EntidadRepository.java
│   └── SectoristaEntidadRepository.java
├── service/                         # Lógica de negocio
│   ├── SectoristaService.java
│   └── EntidadService.java
├── controller/                      # API REST
│   ├── SectoristaController.java
│   └── EntidadController.java
└── config/                          # Configuraciones
    └── WebConfig.java               # CORS
```

## Puerto

- **Desarrollo**: `http://localhost:8080`
- **Angular**: `http://localhost:4200`
- **CORS**: Habilitado para `http://localhost:4200`

## Próximos pasos

1. Descargar e instalar Java 21
2. Descargar e instalar Maven
3. Ejecutar `mvn spring-boot:run`
4. Desde Angular, cambiar las llamadas a localStorage por llamadas HTTP a este backend
5. Configurar la base de datos en la nube (AWS RDS, Google Cloud SQL, etc.)

## Notas importantes

- CORS está configurado para `http://localhost:4200`
- Si cambias el puerto de Angular, actualiza `WebConfig.java` y los `@CrossOrigin` en los controllers
- La base de datos por defecto es H2 (en memoria) - no persiste datos entre reinicios
- Para producción, usa MySQL o PostgreSQL en AWS RDS
