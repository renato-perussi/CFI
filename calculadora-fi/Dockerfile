# ==============================================================================
# Stage 1: base — Dependências instaladas de forma determinística (cacheável)
# ==============================================================================
FROM node:22-alpine AS base

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# ==============================================================================
# Stage 2: dev — Servidor de desenvolvimento Vite com HMR exposto
# ==============================================================================
FROM base AS dev

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# ==============================================================================
# Stage 3: check — Qualidade de código (OxLint + Prettier + Vitest) sob demanda
# ==============================================================================
FROM base AS check

COPY . .

CMD ["sh", "-c", "npm run lint && npm run format:check && npm run test"]

# ==============================================================================
# Stage 4: builder — Compilação TypeScript (tsc -b) + bundle de produção Vite
# ==============================================================================
FROM base AS builder

COPY . .
RUN npm run build

# ==============================================================================
# Stage 5: prod — Servidor Nginx non-root (porta 8080) servindo artefatos de dist/
# ==============================================================================
FROM nginxinc/nginx-unprivileged:stable-alpine AS prod

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder --chown=nginx:nginx /app/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
