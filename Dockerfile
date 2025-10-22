# Stage 1: Build the app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy app files
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Run the app with minimal image
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Copy only necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Set environment variables
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "start"]
