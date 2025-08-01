# syntax=docker/dockerfile:1
FROM node:20-slim AS base

WORKDIR /app

RUN npm install -g pnpm@9.7.0

# throw away build stage to reduce size of final image
FROM base AS build

RUN apt-get update -qq && apt-get install --no-install-recommends -y ca-certificates

# ✅ Aqui está o segredo: copiar o conteúdo da pasta atual
COPY --link . /app

RUN pnpm install
RUN npm run build
RUN mkdir -p dist && cp agent.js dist/

FROM base
COPY --from=build /app /app
COPY --from=build /etc/ssl/certs /etc/ssl/certs

EXPOSE 8081

CMD [ "node", "./dist/agent.js", "start" ]
