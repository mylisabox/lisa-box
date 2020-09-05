#!/usr/bin/env bash

plugins=('lisa-plugin-hue' 'lisa-plugin-kodi' 'lisa-plugin-ir' 'lisa-plugin-voice' 'lisa-plugin-cam-mjpeg' 'lisa-plugin-sony-vpl' 'lisa-plugin-bose-soundtouch')

for plugin in "${plugins[@]}"
do
     cd /var/www/lisa-box/plugins || exit
     if [ ! -d ${plugin} ]; then
        echo "plugin not installed, ignoring"
        #echo "Cloning ${plugin}"
        #git clone "https://github.com/mylisabox/${plugin}"
        #cd ${plugin} || exit
     else
        echo "${plugin} already exist, updating"
        cd ${plugin} || exit
        git pull
     fi
     echo "Installing deps ${plugin}"
     npm i --only=prod --unsafe-perm
done
