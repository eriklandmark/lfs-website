FROM node:lts

WORKDIR /
RUN apt-get update \
    && apt-get install -y -q --no-install-recommends \
    git \
    && apt-get clean \
    && rm -r /var/lib/apt/lists/* /var/cache/*

RUN npm install -g ts-node

COPY service.ts .

CMD ts-node service.ts
