FROM debian:jessie

ARG tag=latest

LABEL image=mylisabox/lisa-box:${tag} \
      maintainer="Jaumard" \
      base=debian:jessie

WORKDIR /opt/app

RUN set -ex;
RUN apt-get update;
RUN	apt-get install -y curl;
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update;
RUN	apt-get install -y nodejs \
        yarn \
        git \
        build-essential \
        libavahi-compat-libdnssd-dev \
        sox \
        libsox-fmt-all \
        libzmq3-dev \
        libasound2-dev;

COPY package*.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000

#ENTRYPOINT [ "tini", "--" ]

CMD [ "node", "server.js" ]
