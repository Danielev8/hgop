FROM node:dubnium
# Set the working directory to /code
WORKDIR /code
# Copies our local files to the docker working directory
# Copies everyfile as it is.
COPY . .

# Installs package dependencies into docker
RUN npm install --production
# Runs the nodejs app
CMD node app.js