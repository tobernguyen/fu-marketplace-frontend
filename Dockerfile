FROM node:5.11.1
MAINTAINER Dong Do<haidongdo1994@gmail.com>

ENV HOME=/src/app

COPY package.json $HOME/web/

WORKDIR $HOME/web

RUN npm install --silent

COPY . $HOME/web

CMD ["npm", "run", "docker:development"]