FROM node:10.16.0

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install
RUN npm run configure

EXPOSE 8080

CMD ["npm", "run", "start:dev"]
