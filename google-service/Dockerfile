FROM node:lts

WORKDIR /

COPY package.json .
RUN npm install

COPY tsconfig.json /tsconfig.json
COPY google-service.ts /google-service.ts

CMD ["npm", "run", "prod"]