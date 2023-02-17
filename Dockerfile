FROM node:18.14.0

WORKDIR /ValorantRankTrackerJS

COPY package*.json ./

RUN npm install

COPY . .

WORKDIR /ValorantRankTrackerJS/src

RUN npm deploy-commands.js

CMD [ "node", "index.js" ]