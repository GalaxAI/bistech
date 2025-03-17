# Dockerfile.kotlin-hello
FROM ubuntu:24.04

# Install Java 8 and utilities
RUN apt-get update && \
    apt-get install -y openjdk-8-jdk wget unzip && \
    apt-get clean

# Download and install Kotlin 2.1.10 from GitHub release
RUN wget https://github.com/JetBrains/kotlin/releases/download/v2.1.10/kotlin-compiler-2.1.10.zip && \
    unzip kotlin-compiler-2.1.10.zip -d /opt/kotlin && \
    rm kotlin-compiler-2.1.10.zip

# Set Kotlin bin directory in PATH
ENV PATH="/opt/kotlin/kotlinc/bin:${PATH}"

# Create app directory
WORKDIR /app

# Copy source code
COPY Main.kt .

# Build and run the Kotlin app
CMD ["sh", "-c", "kotlinc Main.kt -include-runtime -d app.jar && java -jar app.jar"]