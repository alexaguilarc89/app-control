# Proyecto: Gestión de Sectoristas

Sistema completo de gestión de Sectoristas con autenticación, dashboard y sincronización con base de datos en la nube.

---

## 📁 Estructura del Proyecto

```
IA/
├── app-login/              # Frontend Angular 20.3
│   ├── src/
│   ├── angular.json
│   ├── package.json
│   └── README.md
│
├── backend-sectorista/     # Backend Spring Boot 3.3 (Java 21)
│   ├── src/main/java/
│   ├── src/main/resources/
│   ├── pom.xml
│   └── README.md
│
├── INTEGRACION.md          # Guía de integración
├── .gitignore              # Para git
└── README.md               # Este archivo
```

---

## 🎯 Componentes

### Frontend (Angular 20.3)
- ✅ Sistema de login con autenticación local
- ✅ Dashboard con sidebar navigation
- ✅ Formularios con validación
- ✅ Integración con API REST
- ✅ Bootstrap 5 para UI
- **Puerto**: `http://localhost:4200`

### Backend (Spring Boot 3.3 + Java 21)
- ✅ API REST CRUD completa
- ✅ Gestión de Sectoristas y Entidades
- ✅ Transacciones y persistencia
- ✅ CORS configurado
- ✅ Soporte múltiples BD
- **Puerto**: `http://localhost:8080`

### Base de Datos
- **Desarrollo**: H2 (en memoria)
- **Producción**: MySQL/PostgreSQL en AWS RDS o Google Cloud SQL

---

## 🚀 Instalación Rápida

### 1️⃣ Backend (Java 21 + Maven requerido)

```bash
cd backend-sectorista

# Compilar
mvn clean install

# Ejecutar
mvn spring-boot:run
```

✅ Backend en: `http://localhost:8080`

### 2️⃣ Frontend (Node.js + npm requerido)

En otra terminal:

```bash
cd app-login

# Instalar dependencias
npm install

# Ejecutar
ng serve
```

✅ Angular en: `http://localhost:4200`

---

## 📚 Documentación Detallada

- **[app-login/README.md](app-login/README.md)** - Frontend Angular
- **[backend-sectorista/README.md](backend-sectorista/README.md)** - Backend Spring Boot
- **[INTEGRACION.md](INTEGRACION.md)** - Guía de integración completa

---

## 🔐 Credenciales de Prueba

- **Usuario**: `admin`
- **Contraseña**: `123456`

---

## 📡 API Principal

| Recurso | GET | POST | PUT | DELETE |
|---------|-----|------|-----|--------|
| `/api/sectoristas` | ✅ | ✅ | ✅ | ✅ |
| `/api/entidades` | ✅ | ✅ | ✅ | ✅ |

---

## 🗄️ Configurar Base de Datos

### Opción 1: MySQL Local

Editar `backend-sectorista/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/sectorista_db
spring.datasource.username=root
spring.datasource.password=tu_contraseña
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
```

### Opción 2: AWS RDS MySQL

```properties
spring.datasource.url=jdbc:mysql://tu-rds-endpoint.amazonaws.com:3306/sectorista_db
spring.datasource.username=admin
spring.datasource.password=tu_contraseña_segura
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
```

### Opción 3: Google Cloud SQL PostgreSQL

```properties
spring.datasource.url=jdbc:postgresql://IP_PUBLICA:5432/sectorista_db
spring.datasource.username=postgres
spring.datasource.password=tu_contraseña
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQL95Dialect
spring.jpa.hibernate.ddl-auto=update
```

---

## ⚙️ Requisitos del Sistema

### Frontend
- **Node.js**: v18+ (recomendado v20)
- **npm**: 9+
- **Angular CLI**: 20+

### Backend
- **Java JDK**: 21+
- **Maven**: 3.8+

### Base de Datos (Opcional)
- **MySQL**: 8.0+ (para producción)
- **PostgreSQL**: 12+ (alternativa)

---

## 🔄 Flujo de Datos

```
User (Browser)
    ↓ http://localhost:4200
Angular Frontend
    ↓ HTTP REST (/api/*)
Spring Boot Backend (localhost:8080)
    ↓ JDBC/JPA
Base de Datos (Local, AWS, Google Cloud)
```

---

## 📋 Características Implementadas

✅ Autenticación por usuario/contraseña  
✅ Registro de Sectoristas  
✅ Gestión de Entidades  
✅ Dashboard con sidebar  
✅ Formularios con validación  
✅ CRUD completo backend  
✅ Persistencia en BD  
✅ CORS habilitado  
✅ API REST documentada  

---

## 🎓 Stack Tecnológico

### Frontend
- Angular 20.3
- TypeScript
- Bootstrap 5
- RxJS
- Reactive Forms

### Backend
- Spring Boot 3.3
- Java 21
- Spring Data JPA
- Hibernate
- Lombok

### Bases de Datos
- H2 (desarrollo)
- MySQL (producción)
- PostgreSQL (alternativa)

---

## 🐛 Solución de Problemas

### "Cannot GET /api/..."
- Verifica que el backend está corriendo en puerto 8080
- Revisa los logs del backend

### Error de CORS
- El backend tiene CORS para `http://localhost:4200`
- Si cambias puertos, actualiza `WebConfig.java` en el backend

### Error de conexión a BD
- Verifica credenciales en `application.properties`
- Verifica que la BD está corriendo
- Para AWS RDS, verifica security groups

---

## 🚀 Próximos Pasos

1. ✅ Instalar requisitos (Java 21, Node.js, Maven)
2. ✅ Ejecutar backend y frontend
3. ⏭️ Configurar BD (MySQL/PostgreSQL)
4. ⏭️ Desplegar en AWS o Google Cloud
5. ⏭️ Configurar autenticación JWT (opcional)
6. ⏭️ Agregar más funcionalidades

---

## 📞 Soporte

Para más información, consulta la documentación en las carpetas respectivas.

---

## 📄 Licencia

Proyecto educativo - 2026
