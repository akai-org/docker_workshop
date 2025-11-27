FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
# Inline installation to keep workshop file count low
RUN npm install express pg cors
COPY . .
CMD ["node", "server.js"]