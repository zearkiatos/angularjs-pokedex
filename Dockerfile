FROM node:10-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install && \
    npm install -g grunt

ENTRYPOINT [ "npm","run","start" ]

EXPOSE 9000
