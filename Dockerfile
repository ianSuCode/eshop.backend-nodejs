FROM node:20-alpine
WORKDIR /app

RUN apk add --no-cache netcat-openbsd

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD npm start