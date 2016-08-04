FROM geppettoapps/node-flow-jspm:4.4.7
MAINTAINER Theodor Tonum <theodor@tonum.no>
ENV REFRESHED_AT 2016-08-04

ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir /app
WORKDIR /app

COPY package.json ./
RUN npm install

COPY jspm.config.js ./
RUN jspm install

COPY . ./

RUN bin/ci

CMD ["bin/ci"]
