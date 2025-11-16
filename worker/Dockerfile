# Optional Docker setup. Can be ignored if running locally.
FROM node:18

WORKDIR /app

RUN apt-get update && apt-get upgrade -y && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "src/index.js"]
