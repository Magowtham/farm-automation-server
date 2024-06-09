FROM node:slim

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 8000

EXPOSE 2000

CMD node app.js
