FROM node:10.16.0

WORKDIR /usr/src/api

COPY package.json ./

RUN npm install
RUN npm run configure

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
