FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app

# Copiamos el pom.xml del backend
COPY backend/pom.xml .

# Descargamos dependencias
RUN mvn dependency:go-offline

# Copiamos el código fuente
COPY backend/src ./src

# Compilamos
RUN mvn clean package -DskipTests

# ---- Runtime ----
FROM eclipse-temurin:17-jdk
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
CMD ["java","-jar","app.jar"]
