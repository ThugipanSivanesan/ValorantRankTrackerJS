FROM node:16.19.0

WORKDIR /ValorantRankTrackerJS

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "src/","index.js" ]