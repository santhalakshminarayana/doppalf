FROM node:21-bullseye-slim AS deps
WORKDIR /app
COPY package*.json ./
EXPOSE 3001
ENV PORT 3001
ENV HOSTNAME "0.0.0.0"
RUN npm ci

# Development
From deps as dev
ENV NODE_ENV=development
COPY . .
CMD ["npm", "run", "dev"]

FROM node:21-bullseye-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
RUN npm prune --production

# Production
FROM node:21-bullseye-slim AS prod
WORKDIR /app
ENV NODE_ENV production
# Add nextjs user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
# Set the permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next
USER nextjs
# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

EXPOSE 3001
ENV PORT 3001
ENV HOSTNAME "0.0.0.0"

CMD ["npm", "start"]