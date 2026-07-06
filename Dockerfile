# === STAGE 1: Base ===
FROM node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

RUN corepack enable && corepack prepare pnpm@latest --activate

# === STAGE 2: Dependencies & Builder ===
FROM base AS builder

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm run build

# === STAGE 3: Runner (Production) ===
FROM base AS runner

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]