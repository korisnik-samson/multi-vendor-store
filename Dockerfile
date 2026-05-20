# Stage 1: Build
FROM node:22.14.0-alpine AS build
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
# Payload needs these during build for type generation/etc
ENV NEXT_PUBLIC_PAYLOAD_SECRET=79d16d91f6716c22e511a648
ENV NEXT_PUBLIC_DATABASE_URI=mongodb://mongodb:27017/payload
ENV NODE_ENV=production

RUN npm run build

# Stage 2: Production runner
FROM node:22.14.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy built assets
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
