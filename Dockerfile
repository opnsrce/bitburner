
FROM node:lts

RUN mkdir /app

WORKDIR /app

RUN apt-get update

RUN apt-get install -y man

COPY . /app

RUN npm i