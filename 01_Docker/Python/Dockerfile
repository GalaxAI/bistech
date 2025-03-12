FROM ubuntu:22.04

SHELL ["/bin/bash", "-c"]

RUN apt update && \
    apt upgrade -y && \
    apt install -y python3.10 python3-pip && \
    apt clean && \
    rm -rf /var/lib/apt/lists/*
