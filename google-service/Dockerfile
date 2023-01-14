FROM node:lts

WORKDIR /

COPY package.json .
RUN npm install

COPY tsconfig.json /tsconfig.json
COPY instagram-feed-service.ts /instagram-feed-service.ts

CMD ["npm", "run", "prod"]