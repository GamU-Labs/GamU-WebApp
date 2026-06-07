FROM oven/bun:1 AS builder
WORKDIR /app

COPY package*.json bun.lock* ./
RUN bun install --frozen-lockfile

RUN bun run build

FROM oven/bun:1 AS runner
WORKDIR /app

COPY --from=builder /app/.output/server ./output/server
COPY --from=builder /app/.output/public ./output/public
COPY --from=builder /app/package.json ./package.json

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

CMD ["bun", "run", "output/server/index.mjs"]