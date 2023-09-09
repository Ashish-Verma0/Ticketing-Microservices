# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if present) to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle your app source code into the container
COPY . .

# Specify the command to run your listener (adjust as needed)
CMD [ "npm", "run", "listen" ]
