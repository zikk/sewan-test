## Zakaria ABDELAZIZ : _SEWAN code test_

## Installation
```bash
yarn
```

## Run
Create and fill a `.env` file in the `environment` and `src/prisma` directories

## With Docker

#### Run migrations for docker
```bash
yarn migrate
```

#### then run with docker with
```bash
yarn start:api
```

## Locally

#### Run migrations locally
```bash
yarn prisma migrate deploy
```

#### start server
```bash
yarn start
```

## Build
```bash
yarn build:api
```

## Run built server
```bash
yarn serve:api
```