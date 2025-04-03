FROM node:18  # หรือใช้ base image ที่เหมาะสม
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000  # ต้องใช้ EXPOSE 
CMD ["npm", "start"]
