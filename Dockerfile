FROM node:26-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS pnpm
# Node >= 25 no longer bundles corepack.
RUN npm install -g corepack@0.36.0 \
    && corepack enable pnpm

FROM pnpm AS deps
RUN apk add --no-cache libc6-compat
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm i --frozen-lockfile

FROM pnpm AS builder
# NEXT_PUBLIC_* values are inlined into the client bundle at build time, so the
# reCAPTCHA site key has to reach `next build` here; setting it at runtime is a no-op.
ARG NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE
ENV NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE=$NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG APP_VERSION
ARG BUILD_DATE
ARG GIT_SHA
ENV APP_VERSION=$APP_VERSION \
    BUILD_DATE=$BUILD_DATE \
    GIT_SHA=$GIT_SHA
RUN pnpm run build

FROM base AS runner
ENV NODE_ENV="production"

LABEL org.opencontainers.image.title="portfolio" \
      org.opencontainers.image.description="Adrien Guesnel — Portfolio Next.js" \
      org.opencontainers.image.source="https://github.com/adrienguesnel/portfolio"

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs \
    && mkdir .next \
    && chown nextjs:nodejs .next

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
