#!/usr/bin/env bash

apt-get update
apt-get upgrade -y

apt-get install -y curl
apt-get install -y build-essential

#install node
if which node > /dev/null ; then
    curl -sL https://deb.nodesource.com/setup_10.x | bash -
    apt-get install -y nodejs
else
    echo "node is installed, skipping..."
fi

#install yarn
if which yarn > /dev/null ; then
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
    apt-get update && apt-get install -y yarn
fi

#install basic utils
apt-get install -y git

# speaker
## first enable non free repo as libttspico-utils is on it
wget -q https://ftp-master.debian.org/keys/release-10.asc -O- | apt-key add -
echo "deb http://deb.debian.org/debian buster non-free" | tee -a /etc/apt/sources.list
apt-get update
apt-get install libttspico-utils

apt-get install -y libttspico-utils libasound2-dev

#matrix board
if which malos > /dev/null ; then
  curl https://apt.matrix.one/doc/apt-key.gpg | sudo apt-key add -
  echo "deb https://apt.matrix.one/raspbian $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/matrixlabs.list
  apt-get update
  apt-get install -y raspberrypi-kernel-headers
  apt-get install -y matrixio-malos matrixio-kernel-modules
  #echo 'export AUDIODEV=mic_channel8' >>~/.bash_profile
  echo 'export LANG=en-US' >>~/.bash_profile
  source ~/.bash_profile
fi

#sox install for sonus speech recognition
apt-get install -y sox libsox-fmt-all alsa-utils libatlas-base-dev

# others
apt-get install -y libzmq3-dev libavahi-compat-libdnssd-dev

#install lirc
apt-get install -y lirc

if [ ! -d "/var/www" ]; then
  mkdir /var/www
fi

cd /var/www

git clone https://github.com/mylisabox/lisa-box

cd lisa-box

yarn
yarn global add forever

#FIXME doesn't like syntax here
plugins=('lisa-plugin-hue' 'lisa-plugin-kodi' 'lisa-plugin-ir' 'lisa-plugin-voice' 'lisa-plugin-cam-mjpeg' 'lisa-plugin-sony-vpl' 'lisa-plugin-bose-soundtouch')

for plugin in "${plugins[@]}"
do
     cd /var/www/lisa-box/plugins
     if [ ! -d ${plugin} ]; then
        echo "Cloning ${plugin}"
        git clone "https://github.com/mylisabox/${plugin}"
        cd ${plugin}
     else
        echo "${plugin} already exist, updating"
        cd ${plugin}
        git pull
     fi
     echo "Installing deps ${plugin}"
     yarn
done

cd /etc/init.d/
wget https://raw.githubusercontent.com/mylisabox/lisa-box/master/scripts/lisa
chmod 755 /etc/init.d/lisa
update-rc.d lisa defaults


RED='\033[0;31m'
NC='\033[0m'
echo -e "${RED}To make speech working you need to add a Google configuration file manually at /var/www/lisa-box/config/speech/LISA-gfile.json${NC}"
echo -e "${RED}See https://cloud.google.com/speech/docs/getting-started${NC}"
echo -e "${RED}please reboot now to finish the installation${NC}"
