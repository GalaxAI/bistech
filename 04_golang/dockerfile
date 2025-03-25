FROM golang:1.24-alpine AS builder

WORKDIR /app

# Install build dependencies for SQLite
RUN apk add --no-cache gcc musl-dev

# Copy go.mod and go.sum files first for better caching
COPY go.mod go.sum ./
RUN go mod download

COPY . .

# Build the application with CGO enabled
RUN go build -o server

# Final stage
FROM alpine:latest

WORKDIR /app

# Install runtime dependencies for SQLite
RUN apk add --no-cache libc6-compat

COPY --from=builder /app/server .

# COPY *.db ./

# Expose the port the server runs on
EXPOSE 1323

# Command to run the application
CMD ["./server"]