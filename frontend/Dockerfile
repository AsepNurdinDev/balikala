# ---------- Stage 1: deps ----------
# Install dependency terpisah supaya layer ini bisa di-cache
# selama package.json tidak berubah.
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

# ---------- Stage 2: builder ----------
FROM node:20-alpine AS builder
WORKDIR /app

# NEXT_PUBLIC_API_URL dibutuhkan SAAT BUILD karena nilainya
# di-inline ke dalam bundle JavaScript untuk dipakai di browser.
# Override lewat: docker build --build-arg NEXT_PUBLIC_API_URL=...
ARG NEXT_PUBLIC_API_URL=http://localhost:8090
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# ---------- Stage 3: run ----------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ARG NEXT_PUBLIC_API_URL=http://localhost:8090
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Jalankan sebagai user non-root untuk keamanan
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Hasil build "standalone" (lihat next.config.ts) sudah berisi
# server.js minimal + node_modules yang diperlukan saja.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
