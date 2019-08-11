FROM node:10.16.0

WORKDIR /usr/app

COPY package.json ./

COPY . .

# COPY ../scripts ../scripts

EXPOSE 3000

CMD ["npm", "run", "bootstrap"]
