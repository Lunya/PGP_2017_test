FROM node:9

USER node

RUN mkdir /home/node/app

WORKDIR /home/node/app

COPY ./wait-for-it.sh /home/node/app

COPY ./package.json /home/node/app

COPY ./package-lock.json /home/node/app

RUN cd /home/node/app && npm install --save

COPY . /home/node/app

EXPOSE 3000

CMD ["./wait-for-it.sh", "mariadb:3306", "-t", "40", "--", "npm", "run", "docker-dev"]
