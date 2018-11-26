FROM node:dubnium
# Set the working directory to /code
WORKDIR /code
# Copies our local files to the docker working directory
COPY package.json package.json

COPY database.js database.js

COPY app.js app.js
# Installs package dependencies into docker
RUN npm install
# Runs the nodejs app
CMD node app.js