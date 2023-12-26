# Use an official base image (e.g., Node.js)
FROM node:14

# Set the working directory in the container
WORKDIR /homeRentals

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Set the working directory to the 'client' folder
WORKDIR /client

# Build the client (modify this line based on your actual build command)
RUN npm install && npm run build

# Reset the working directory to the parent
WORKDIR /app

# Expose a port (if needed)
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "start"]


