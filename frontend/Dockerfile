FROM node:21-alpine3.18

WORKDIR /app

COPY . .

RUN npm install

WORKDIR /app/src
RUN npx prisma generate

WORKDIR /app
RUN npx tsc

EXPOSE 3000
EXPOSE 8080

CMD ["node", "dist/index.js"]