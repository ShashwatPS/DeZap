FROM node:21-alpine3.18

WORKDIR /app

COPY . .

RUN npm install
RUN npx tsc

COPY start.sh /start.sh
RUN chmod +x start.sh

CMD ["./start.sh"]