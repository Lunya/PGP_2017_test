FROM node:9

USER node

RUN mkdir /home/node/app

WORKDIR /home/node/app

COPY ./package.json /home/node/app

COPY ./package-lock.json /home/node/app

RUN cd /home/node/app && npm install

COPY . /home/node/app

EXPOSE 4200

CMD ["npm", "start"]
