# Dockerfile_ubuntu2404_java8_python310_kotlin
FROM ubuntu:24.04

SHELL ["/bin/bash", "-c"]

RUN apt update && \
    apt update

RUN apt install -y openjdk-8-jdk curl unzip && \
    apt clean && \
    rm -rf /var/lib/apt/lists/*

RUN curl -L https://github.com/JetBrains/kotlin/releases/download/v2.1.10/kotlin-compiler-2.1.10.zip -o kotlin.zip && \
    unzip kotlin.zip -d /opt/ && \
    mv /opt/kotlinc /opt/kotlin && \
    rm kotlin.zip && \
    ln -s /opt/kotlin/bin/kotlinc /usr/bin/kotlinc

# Add Kotlin to PATH
ENV PATH="/opt/kotlin/bin:${PATH}"
