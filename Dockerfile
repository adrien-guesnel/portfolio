# Install dependencies
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /usr/app

FROM base AS deps

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Install prod dependencies
FROM base AS deps_prod

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# Builder
FROM base AS builder

ARG GOOGLE_RECAPTCHA_SITE

ENV NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE=$GOOGLE_RECAPTCHA_SITE

COPY --from=deps /usr/app/node_modules ./node_modules
COPY . .

RUN pnpm build

# Container for prod release
FROM base AS prod

ARG GOOGLE_RECAPTCHA_SITE

ENV NODE_ENV="production"
ENV NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE=$GOOGLE_RECAPTCHA_SITE

RUN apt-get update && apt-get install -y openssl ca-certificates

COPY package.json ./
COPY --from=deps_prod /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/.next ./.next

EXPOSE 3000

CMD ["pnpm", "start"]