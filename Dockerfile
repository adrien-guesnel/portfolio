# Install dependencies
FROM node:20-slim AS deps

WORKDIR /usr/app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Install prod dependencies
FROM node:20-slim AS deps_prod

WORKDIR /usr/app

COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

# Builder
FROM node:20-slim AS builder

WORKDIR /usr/app

COPY --from=deps /usr/app/node_modules ./node_modules
COPY . .

RUN yarn build

# Container for prod release
FROM node:20-slim AS prod

ENV NODE_ENV production

RUN apt-get update && apt-get install -y openssl ca-certificates

WORKDIR /usr/app

COPY ./public .
COPY package.json ./
COPY --from=deps_prod /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/.next ./.next

EXPOSE 3000

CMD ["yarn", "start"]