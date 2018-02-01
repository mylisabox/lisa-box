FROM debian:jessie
#FROM node:carbon

WORKDIR /usr/src/app

RUN set -ex;
RUN apt-get update;
RUN	apt-get install -y curl;
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update;
RUN	apt-get install -y nodejs;
RUN	apt-get install -y yarn;
RUN	apt-get install -y git;
RUN	apt-get install -y build-essential;
RUN	apt-get install -y libavahi-compat-libdnssd-dev;
RUN	apt-get install -y sox;
RUN	apt-get install -y libsox-fmt-all;
RUN	apt-get install -y alsa-utils;
RUN	apt-get install -y libzmq3-dev;
RUN	apt-get install -y libasound2-dev;

COPY package*.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000
CMD [ "node", "server.js" ]
