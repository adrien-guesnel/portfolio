# Install dependencies
FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apk add --no-cache libc6-compat
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

COPY --from=deps /usr/app/node_modules ./node_modules
COPY . .

RUN pnpm build

# Container for prod release
FROM base AS prod

ENV NODE_ENV="production"

RUN apk update && apk add openssl ca-certificates

COPY package.json ./
COPY --from=deps_prod /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/.next ./.next

EXPOSE 3000

CMD ["pnpm", "start"]