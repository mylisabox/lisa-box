#!/usr/bin/env bash

set -ex;
apt-get update;
apt-get install -y curl;
curl -sL https://deb.nodesource.com/setup_8.x | bash -
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
apt-get update && apt-get install -y nodejs \
        yarn \
        git \
        build-essential \
        avahi-daemon \
        avahi-utils \
        libnss-mdns \
        libavahi-compat-libdnssd-dev;

systemctl enable avahi-daemon
