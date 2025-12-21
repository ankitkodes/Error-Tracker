FROM node:22-alpine3.21 AS builder

WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm install
COPY . .
RUN npm ci

ENV NEXT_TELEMETRY_DISABLED=1
RUN npx prisma generate
RUN npm run build
RUN npm prune --omit=dev && npm cache clean --force

FROM node:22-alpine3.21 AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package*.json  ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules  ./node_modules

EXPOSE 3000
CMD [ "npm", "start" ]