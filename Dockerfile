FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app

# Copiamos solo el pom primero (cache)
COPY backend/pom.xml .

RUN mvn dependency:go-offline

# Copiamos el código fuente REAL
COPY backend/src ./src

RUN mvn clean package -DskipTests

# ---------------- Runtime ----------------
FROM eclipse-temurin:17-jdk
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
CMD ["java","-jar","app.jar"]
