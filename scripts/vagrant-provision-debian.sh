#!/usr/bin/env bash
apt-get update -y

#install build utils
apt-get install -y build-essential

#install basic utils
apt-get install -y nano curl git unzip mongodb-server

#install node
curl -sL https://deb.nodesource.com/setup_7.x | bash -
apt-get install -y nodejs

#install yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
apt-get update -y && apt-get install -y yarn

#sox install for sonus speech recognition
apt-get install -y sox libsox-fmt-all alsa-utils

apt-get install -y libatlas-base-dev libatlas3gf-base
apt-get install -y usbutils
apt-get install -y lirc
apt-get install -y libzmq-dev

cd /vagrant && yarn install
