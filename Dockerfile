# ใช้ Node.js เป็น Base Image
FROM node:18-alpine

# ตั้งค่า Working Directory ใน Container
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json (ถ้ามี)
COPY package*.json ./

# ติดตั้ง Dependencies
RUN npm install

# คัดลอก Source Code ทั้งหมด
COPY . .

# Build แอปพลิเคชัน (ถ้าจำเป็น เช่น Next.js)
RUN npm run build

# เปิด Port ที่ App Service จะใช้
EXPOSE 8080

# Command ที่ใช้ Run แอปพลิเคชัน
CMD [ "npm", "start" ]
