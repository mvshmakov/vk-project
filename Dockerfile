
# Setup and build the client

FROM node:10.16.0 as client

WORKDIR /usr/app/client/
COPY client/package.json ./
COPY client/ ./
# COPY ../scripts ../scripts

RUN npm set unsafe-perm true
RUN npm run build


# Setup the server

FROM node:10.16.0

WORKDIR /usr/app/
COPY --from=client /usr/app/client/build/ ./client/build/

WORKDIR /usr/app/server/
COPY server/package.json ./
COPY server/ ./
# COPY ../scripts ../scripts

ENV PORT 8000
EXPOSE 8000

RUN npm set unsafe-perm true
CMD ["npm", "run", "bootstrap"]
