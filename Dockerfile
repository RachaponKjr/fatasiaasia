# Stage 1: Build the app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy only the package files first
COPY package.json package-lock.json* ./

# Install only production dependencies first to cache better
RUN npm install

# Copy the rest of the files
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Run the app with minimal image
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only what’s needed from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
