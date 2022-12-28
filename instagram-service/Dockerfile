FROM node:lts

WORKDIR /

COPY package.json .
RUN npm install

COPY tsconfig.json /tsconfig.json
COPY instagram-service.ts /instagram-service.ts

CMD ["npm", "run", "prod"]