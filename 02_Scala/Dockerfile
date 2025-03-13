FROM ubuntu:24.04

# Update package lists and install dependencies
RUN apt-get update && apt-get install -y curl openjdk-17-jdk

# Set Scala version and download Scala binary from github
ENV SCALA_VERSION=3.6.4
RUN curl -L -o scala.tgz "https://github.com/scala/scala3/releases/download/$SCALA_VERSION/scala3-$SCALA_VERSION-x86_64-pc-linux.tar.gz" \
    && tar -xzf scala.tgz -C /usr/local \
    && mv /usr/local/scala3-$SCALA_VERSION-x86_64-pc-linux /usr/local/scala3-$SCALA_VERSION \
    && rm scala.tgz

# Configure Scala environment variables
ENV SCALA_HOME=/usr/local/scala3-$SCALA_VERSION
ENV PATH=$PATH:$SCALA_HOME/bin

ENV SBT_VERSION=1.10.10
RUN curl -L -o sbt.tgz "https://github.com/sbt/sbt/releases/download/v${SBT_VERSION}/sbt-${SBT_VERSION}.tgz" \
    && tar -xzf sbt.tgz -C /usr/local \
    && mv /usr/local/sbt /usr/local/sbt-${SBT_VERSION} \
    && rm sbt.tgz

ENV SBT_HOME=/usr/local/sbt-${SBT_VERSION}
ENV PATH=$PATH:$SBT_HOME/bin

# RUN scala -version sbt --version

# Set working directory and copy project files
WORKDIR /app
COPY play-scala-seed/ .

# Build the application
RUN sbt compile

EXPOSE 9000

# Run (development mode)
CMD ["sbt", "run"]
