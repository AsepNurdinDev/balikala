# ---------- Stage 1: build ----------
FROM golang:1.25-alpine AS builder

WORKDIR /app

# install dependency dulu biar layer cache efektif
COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o server ./cmd

# ---------- Stage 2: run ----------
FROM alpine:latest

WORKDIR /app

# sertifikat ssl & timezone (opsional, aman untuk koneksi external)
RUN apk add --no-cache ca-certificates tzdata

COPY --from=builder /app/server .
COPY --from=builder /app/.env .

# folder untuk simpan gambar upload
RUN mkdir -p /app/uploads

EXPOSE 8080

CMD ["./server"]
