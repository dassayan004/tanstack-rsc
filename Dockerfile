FROM node:22-alpine AS base

# ---- Build Stage ----
FROM base AS builder

WORKDIR /app

# Install pnpm only for the build stage
RUN npm install -g pnpm

# Install dependencies
COPY package.json pnpm-lock.yaml* ./
RUN pnpm i --frozen-lockfile

# Copy source and build
COPY . .
RUN pnpm build

# ---- Production Stage ----
FROM base AS production

WORKDIR /app

# Copy only what is needed for runtime
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Set production environment
ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "run", "start"]
