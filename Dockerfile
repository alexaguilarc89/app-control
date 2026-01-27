# ---- Build Stage ----
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

# Copiamos pom.xml para aprovechar cache
COPY backend/pom.xml .

# Descargar dependencias
RUN mvn dependency:go-offline

# Copiamos código fuente
COPY backend/src ./src

# Compilamos el proyecto (sin tests para acelerar)
RUN mvn clean package -DskipTests

# ---- Runtime Stage ----
FROM eclipse-temurin:21-jdk
WORKDIR /app

# Copiamos JAR construido
COPY --from=build /app/target/*.jar app.jar

# Puerto dinámico de Render
EXPOSE 8080

# Iniciar aplicación
CMD ["java","-jar","app.jar"]