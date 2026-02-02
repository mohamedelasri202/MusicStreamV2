FROM maven:3.9.6-eclipse-temurin-17 As build
WORKDIR /app

COPY pom.xml .
RUN mvn -q -DskipTests dependency:go-offline
COPY  src ./src
RUN mvn -q -DskipTests clean package

FROM eclipse-temurin:17-jre-jammy

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]
