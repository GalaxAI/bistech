FROM ubuntu:24.04

SHELL ["/bin/bash", "-c"]

RUN apt update && apt install -y openjdk-8-jdk curl unzip && apt clean && rm -rf /var/lib/apt/lists/*


RUN curl -L https://github.com/JetBrains/kotlin/releases/download/v2.1.10/kotlin-compiler-2.1.10.zip -o kotlin.zip && \
    unzip kotlin.zip -d /opt/ && \
    mv /opt/kotlinc /opt/kotlin && \
    rm kotlin.zip && \
    ln -s /opt/kotlin/bin/kotlinc /usr/bin/kotlinc

RUN curl -L https://services.gradle.org/distributions/gradle-8.12-bin.zip -o gradle.zip && \
    unzip gradle.zip -d /opt/ && \
    mv /opt/gradle-8.12 /opt/gradle && \
    rm gradle.zip && \
    ln -s /opt/gradle/bin/gradle /usr/bin/gradle


# Add PATHS
ENV PATH="/opt/kotlin/bin:${PATH}"
ENV GRADLE_HOME=/opt/gradle
ENV PATH="${GRADLE_HOME}/bin:${PATH}"

COPY . /app
WORKDIR /app

RUN gradle clean build

CMD ["java", "-jar", "build/libs/app.jar"]
