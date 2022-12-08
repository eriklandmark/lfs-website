FROM node:lts

WORKDIR /

COPY package.json .
RUN npm install

COPY tsconfig.json /tsconfig.json
COPY vue.config.js /vue.config.js
COPY babel.config.js /babel.config.js
COPY .env /.env
COPY serve.json /serve.json
COPY public /public
COPY src /src

ARG VUE_APP_ENV
ENV VUE_APP_ENV $VUE_APP_ENV

RUN npm run vue:build

CMD npm run prod
