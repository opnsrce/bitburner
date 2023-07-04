
FROM node:lts

RUN mkdir /app

WORKDIR /app

RUN apt-get update

RUN apt-get install -y man

RUN apt-get install -y vim

COPY . /app

RUN npm i