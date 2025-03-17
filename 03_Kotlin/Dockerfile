FROM ubuntu:24.04

# Avoid prompts from apt
ENV DEBIAN_FRONTEND=noninteractive

# Update and install dependencies
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    curl \
    git \
    zip \
    openjdk-17-jdk \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set up environment variables
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH=$PATH:$JAVA_HOME/bin

# Install Kotlin
RUN curl -s https://get.sdkman.io | bash \
    && bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && \
    sdk install kotlin && \
    sdk install gradle"

# Environment setup for SDKMAN
ENV SDKMAN_DIR="/root/.sdkman"
ENV PATH=$PATH:/root/.sdkman/candidates/kotlin/current/bin:/root/.sdkman/candidates/gradle/current/bin

# Set working directory
WORKDIR /app

# Copy project files (assuming they are in the same directory as the Dockerfile)
COPY . .

# Build the application
RUN bash -c "source /root/.sdkman/bin/sdkman-init.sh && gradle build"

# Expose the port your Ktor application will run on (default is 8080)
EXPOSE 8080

# Run the application
CMD ["bash", "-c", "source /root/.sdkman/bin/sdkman-init.sh && gradle run"]
