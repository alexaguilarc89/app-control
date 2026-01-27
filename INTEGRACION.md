# Guía de Integración: Angular + Spring Boot

## Estructura del Proyecto

```
PROYECTOS/IA/
├── app-login/          # Frontend Angular 20
│   ├── src/
│   │   ├── app/
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.guard.ts
│   │   │   │   └── api.service.ts        ← NUEVO
│   │   │   └── ...
│   │   └── main.ts
│   └── package.json
│
└── backend/            # Backend Spring Boot 3.3 (Java 21)
    ├── src/main/java/com/sectorista/
    │   ├── SectoristasApplication.java
    │   ├── controller/
    │   ├── service/
    │   ├── repository/
    │   ├── model/
    │   ├── dto/
    │   └── config/
    ├── src/main/resources/
    │   └── application.properties
    └── pom.xml
```

## Paso 1: Instalar y compilar el Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

**El backend estará en**: `http://localhost:8080`

## Paso 2: Iniciar Angular

En otra terminal:

```bash
cd app-login
npm install
ng serve
```

**Angular estará en**: `http://localhost:4200`

## Paso 3: Usar la API desde Angular

El servicio `api.service.ts` ya está creado. Úsalo en tus componentes:

### Ejemplo: Usar ApiService en el Registro de Sectoristas

```typescript
import { Component, OnInit } from '@angular/core';
import { ApiService, SectoristaDTO } from '../services/api.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {
  sectoristas: SectoristaDTO[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.cargarSectoristas();
  }

  cargarSectoristas() {
    this.apiService.getAllSectoristas().subscribe(
      (data) => {
        this.sectoristas = data;
      },
      (error) => {
        console.error('Error cargando sectoristas:', error);
      }
    );
  }

  crearSectorista(sectorista: SectoristaDTO) {
    this.apiService.createSectorista(sectorista).subscribe(
      (result) => {
        console.log('Sectorista creado:', result);
        this.cargarSectoristas();
      },
      (error) => console.error('Error:', error)
    );
  }

  actualizarSectorista(id: number, sectorista: SectoristaDTO) {
    this.apiService.updateSectorista(id, sectorista).subscribe(
      (result) => {
        console.log('Sectorista actualizado:', result);
        this.cargarSectoristas();
      },
      (error) => console.error('Error:', error)
    );
  }

  eliminarSectorista(id: number) {
    this.apiService.deleteSectorista(id).subscribe(
      () => {
        console.log('Sectorista eliminado');
        this.cargarSectoristas();
      },
      (error) => console.error('Error:', error)
    );
  }
}
```

## Paso 4: Cambiar Base de Datos

Por defecto usa H2 (en memoria). Para usar MySQL o PostgreSQL en la nube:

### Opción A: MySQL Local

1. Instalar MySQL
2. Crear base de datos:

```sql
CREATE DATABASE sectorista_db;
```

3. Editar `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/sectorista_db
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.username=root
spring.datasource.password=tu_contraseña
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
```

### Opción B: AWS RDS MySQL

```properties
spring.datasource.url=jdbc:mysql://tu-endpoint-rds.aws.com:3306/sectorista_db
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.username=admin
spring.datasource.password=tu_contraseña_segura
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
```

### Opción C: Google Cloud SQL PostgreSQL

```properties
spring.datasource.url=jdbc:postgresql://IP_PUBLICA:5432/sectorista_db
spring.datasource.driver-class-name=org.postgresql.Driver
spring.datasource.username=postgres
spring.datasource.password=tu_contraseña
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQL95Dialect
spring.jpa.hibernate.ddl-auto=update
```

## Paso 5: Endpoints Disponibles

### Sectoristas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/sectoristas` | Obtener todos |
| GET | `/api/sectoristas/{id}` | Obtener por ID |
| POST | `/api/sectoristas` | Crear nuevo |
| PUT | `/api/sectoristas/{id}` | Actualizar |
| DELETE | `/api/sectoristas/{id}` | Eliminar |

### Entidades

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/entidades` | Obtener todas |
| GET | `/api/entidades/activas` | Solo activas |
| GET | `/api/entidades/{id}` | Obtener por ID |
| POST | `/api/entidades` | Crear nueva |
| PUT | `/api/entidades/{id}` | Actualizar |
| DELETE | `/api/entidades/{id}` | Eliminar |

## Flujo Completo

```
1. Angular inicia en :4200
2. Usuario hace login (guarda en localStorage)
3. Angular hace peticiones HTTP al backend en :8080
4. Backend procesa y guarda en base de datos
5. Base de datos puede estar en:
   - H2 (desarrollo local)
   - MySQL local
   - AWS RDS
   - Google Cloud SQL
```

## Troubleshooting

### Error: "Cannot GET /api/..."

- Asegúrate que el backend está corriendo en `:8080`
- Verifica `WebConfig.java` tenga CORS habilitado

### Error: "CORS error"

- El backend tiene CORS configurado para `http://localhost:4200`
- Si cambias puertos, actualiza `WebConfig.java`:

```java
registry.addMapping("/api/**")
    .allowedOrigins("http://localhost:NUEVO_PUERTO")
```

### Error: "Database connection failed"

- Verifica credenciales en `application.properties`
- Verifica que la base de datos esté corriendo
- Para AWS RDS, verifica security groups

## Próximos Pasos

1. ✅ Crear proyecto Spring Boot
2. ✅ Crear servicio HTTP en Angular
3. ⏭️ Reemplazar localStorage por llamadas HTTP
4. ⏭️ Desplegar en AWS o Google Cloud
5. ⏭️ Configurar JWT para autenticación

## Comandos Útiles

### Backend
```bash
# Compilar
mvn clean install

# Ejecutar
mvn spring-boot:run

# En modo desarrollo
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"
```

### Angular
```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
ng serve

# Compilar para producción
ng build --prod
```

## Documentación

- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [Angular HttpClient](https://angular.io/guide/http)
- [AWS RDS](https://aws.amazon.com/rds/)
- [Google Cloud SQL](https://cloud.google.com/sql)
