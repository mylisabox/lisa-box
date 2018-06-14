FROM debian:jessie

ARG tag=latest
ARG VOICE_ACTIVATED=false

LABEL image=mylisabox/lisa-box:${tag} \
      maintainer="Jaumard" \
      base=debian:jessie

WORKDIR /opt/app

COPY scripts/dockerSetup.sh /

RUN bash -c "/dockerSetup.sh"

COPY package*.json ./
COPY yarn.lock ./

RUN yarn
#RUN if [ "$VOICE_ACTIVATED" == "true" ] ; then yarn add lisa-standalone-voice-command lisa-speaker-polly ; fi;

ENV VOICE_ACTIVATED=$VOICE_ACTIVATED
ENV LOGGER=no

COPY . .

COPY config configBackup

VOLUME /opt/app/config
VOLUME /opt/app/plugins

EXPOSE 3000

#ENTRYPOINT [ "tini", "--" ]

CMD ["sh","-c", "service dbus start && service avahi-daemon start && rsync -a -v --ignore-existing configBackup/** config && node server.js" ]
