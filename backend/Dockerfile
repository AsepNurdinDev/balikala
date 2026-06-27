# ---------- Stage 1: build ----------
FROM golang:1.25-alpine AS builder

WORKDIR /app

ENV GOPROXY=https://proxy.golang.org,direct

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o server ./cmd

# ---------- Stage 2: run ----------
FROM alpine:latest

WORKDIR /app

RUN apk add --no-cache ca-certificates tzdata

COPY --from=builder /app/server .

# folder untuk simpan gambar upload
RUN mkdir -p /app/uploads

EXPOSE 8090

CMD ["./server"]
