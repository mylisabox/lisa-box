#!/usr/bin/env bash

#Resize SD from minibian https://minibianpi.wordpress.com/how-to/resize-sd/
#Install wifi BT https://minibianpi.wordpress.com/how-to/rpi3/
#Config WIFI https://minibianpi.wordpress.com/how-to/wifi/

#install build utils
apt-get install -y build-essential

#install wifi/BT
apt-get update && apt-get install -y firmware-brcm80211 pi-bluetooth wpasupplicant

#install basic utils
apt-get install -y nano curl git unzip

#install node
curl -sL https://deb.nodesource.com/setup_7.x | bash -
apt-get install -y nodejs

#install yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
apt-get update && apt-get install -y yarn

#sox install for sonus speech recognition
apt-get install -y sox libsox-fmt-all alsa-utils

apt-get install libatlas-base-dev libatlas3gf-base
apt-get install usbutils
apt-get install lirc

#rsync -avz config/speech/LISA-gfile.json root@192.168.1.10:/var/www/lisa-box/config/speech/
#rsync -avz lisa.sqlite root@192.168.1.10:/var/www/lisa-box

#make sonus works
#nano ~/.bashrc
#export LD_LIBRARY_PATH=/usr/local/lib/python2.7/
#export AUDIODEV=hw:1,0
