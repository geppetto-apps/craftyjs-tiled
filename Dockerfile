FROM node:4.4.7
MAINTAINER Theodor Tonum <theodor@tonum.no>
ENV REFRESHED_AT 2016-08-04

RUN apt-get -yqq update
RUN apt-get -yqq install \
  libelf-dev

ENV NPM_CONFIG_LOGLEVEL warn

# RUN mkdir ~/.ssh
# RUN ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts

RUN mkdir /app
WORKDIR /app

COPY package.json ./
RUN npm install

COPY jspm.config.js ./
RUN npm install jspm@beta -g

RUN jspm install

COPY . ./

RUN bin/ci

CMD ["bin/ci"]
