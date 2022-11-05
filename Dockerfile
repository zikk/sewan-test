FROM node:18-alpine AS deps

WORKDIR /api

COPY package* yarn* tsconfig* ./
COPY src/shared/infra/prisma/* ./src/shared/infra/prisma/

RUN yarn install --production=false

FROM node:18-alpine AS builder

WORKDIR /api

COPY package* yarn* tsconfig* ./
COPY --from=deps /api/node_modules ./node_modules
COPY ./src ./src
COPY --from=deps /api/node_modules ./node_modules

RUN if [ "$NODE_ENV" != "development" ]; then yarn build:api; fi

FROM node:18-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
EXPOSE $PORT 9229

WORKDIR /api

# RUN mkdir -p ./logs
COPY package* yarn* tsconfig* nodemon.json ./
COPY --from=builder api/node_modules ./node_modules
COPY --from=builder api/src ./src

RUN yarn install

USER node

CMD yarn serve:api