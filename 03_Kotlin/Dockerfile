FROM gradle:7.6.1-jdk17 AS build
WORKDIR /app
COPY . .
RUN gradle build --no-daemon

FROM openjdk:17-slim
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
COPY .env .

# Install required packages for running
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Expose any necessary ports (if needed)
# EXPOSE 8080

# Run the application
CMD ["java", "-jar", "app.jar"]