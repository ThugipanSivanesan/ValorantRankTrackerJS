FROM node:18.14.0

WORKDIR /ValorantRankTrackerJS

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "src/","index.js" ]