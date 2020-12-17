FROM node:14-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install && \
    npm install -g grunt

ENTRYPOINT [ "grunt" ]

EXPOSE 9000
