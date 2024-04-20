FROM node:18-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm install -g @nestjs/cli typescript vite
RUN pnpm install
RUN pnpm run -r build

RUN pnpm deploy --filter=server --prod /var/www/server
RUN pnpm deploy --filter=web --prod /var/www/web

FROM base AS server
COPY --from=build /var/www/server /var/www/server
WORKDIR /var/www/server
EXPOSE 8000
CMD [ "pnpm", "start" ]

FROM base AS web
COPY --from=build /var/www/web /var/www/web
WORKDIR /var/www/web
EXPOSE 3000
CMD [ "pnpm", "start" ]