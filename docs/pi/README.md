# Raspberry PI images

# L.I.S.A. on Raspberry PI 2 or 3

All you need is a 8Go SD Card, [download the image here](https://drive.google.com/file/d/1KRmQNlsxgLTiexoRlW0kak4iQa2UQilq/view?usp=sharing) and install it on your SD Card.

Everything is already configured with all available plugins, the only things that is not configured is the speech recognition because it will depends on your hardware.

## Setup voice recognition (Software)
Voice recognition work in 2 phases thanks to the [sonus](https://github.com/evancohen/sonus) module:
- First offline recognition of the hotwords "Hey lisa", nothing to do here it should work
- Then the next part use Google Speech API to recognize the voice command, Google API need a config file to work. 
 This file should be under `/var/www/lisa-box/config/speech/LISA-gfile.json`, to create this file please follow 
 [those steps](https://cloud.google.com/speech/docs/getting-started) and copy/paste/rename the file in the correct place.

## Setup voice recognition (Hardware)
### Matrix board
If you use the Matrix Board, you'll need to install more dependencies.
 
- Run `apt-get install matrix-creator-init matrix-creator-malos` 
- Edit the file `/etc/init.d/lisa` and uncomment the line `export AUDIODEV=mic_channel8`

### Other microphone
If you use another microphone, you need to add the correct value under the file `/etc/init.d/lisa`, uncomment the line `export AUDIODEV=mic_channel8` and change the value according to your microphone
