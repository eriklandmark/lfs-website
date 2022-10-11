FROM node:lts

WORKDIR /

COPY package.json .
RUN npm install
RUN npm install --global serve

COPY public /public
COPY src /src
COPY tsconfig.json /tsconfig.json
COPY vue.config.js /vue.config.js
COPY babel.config.js /babel.config.js
COPY .env /.env
COPY serve.json /serve.json

RUN npm run build

CMD serve
