FROM node:10.16.0

WORKDIR /usr/app

COPY package.json ./

COPY . .

# COPY ../scripts ../scripts

EXPOSE 8080

CMD ["npm", "run", "bootstrap"]
