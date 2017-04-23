#!/usr/bin/env bash

#install wifi/BT
apt-get update && apt-get install -y firmware-brcm80211 pi-bluetooth wpasupplicant

apt-get install -y nano curl

#install node
curl -sL https://deb.nodesource.com/setup_7.x | bash -
apt-get install -y nodejs

#install git
apt-get install -y git

#install yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
apt-get update && apt-get install -y yarn

#sox install for sonus speech recognition
apt-get install -y sox libsox-fmt-all
