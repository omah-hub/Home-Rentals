# Use an official base image (e.g., Node.js)
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the client (adjust the command as per your client build process)
RUN cd client && npm install && npm run build

# Expose a port (if needed)
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "start"]

