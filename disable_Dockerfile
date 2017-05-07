# Use node 4.6.1 as a base image (https://hub.docker.com/_/node/)
FROM node:4.6.1

# Set the working directory to /app
#WORKDIR /app

# Copy the current directory contents into the container
ADD . .

# Install any needed packages from packages.json
RUN npm install -g gulp
RUN npm install

#Expose the port seeya uses to be available outside the container
EXPOSE 1337

VOLUME [ "/usr/src/app" ]

#Run seeya
CMD ["gulp"]