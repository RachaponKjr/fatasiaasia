# Stage 1: Builder
FROM node:18-alpine AS builder

# ติดตั้ง dependencies ที่จำเป็นสำหรับ Alpine
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy Source Code
COPY . .

# Build Next.js
# (ต้องมั่นใจว่าใน next.config.ts ใส่ output: 'standalone' แล้ว)
RUN npm run build

# Stage 2: Runner (Secure)
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# 1. สร้าง User ใหม่ที่ไม่ใช่ Root (ความปลอดภัยสูงสุด)
# สร้าง Group ชื่อ nodejs และ User ชื่อ nextjs
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy เฉพาะไฟล์ที่จำเป็นจาก Builder
COPY --from=builder /app/public ./public

# Copy ไฟล์ที่ Build เสร็จแล้ว และเปลี่ยนเจ้าของไฟล์เป็น nextjs (ไม่ใช่ root)
# โหมด Standalone จะช่วยให้ไม่ต้อง Copy node_modules ทั้งก้อนมา
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 2. สลับไปใช้ User ธรรมดา (สำคัญมาก! บล็อก Root Access)
USER nextjs

EXPOSE 3000

# ใช้ node server.js แทน npm start (เบากว่าและจัดการ signal ได้ดีกว่า)
CMD ["node", "server.js"]