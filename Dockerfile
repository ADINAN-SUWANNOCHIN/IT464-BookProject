FROM node:18  # หรือใช้ base image ที่เหมาะสม
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 80  # ต้องใช้ EXPOSE 80
CMD ["npm", "start"]
