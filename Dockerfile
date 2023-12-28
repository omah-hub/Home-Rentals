# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory to /app
WORKDIR /homeRentals

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./homeRentals

# Install any needed packages specified in package.json
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the client (modify this line based on your actual build command)
WORKDIR /homeRentals/
RUN npm install && npm run build

# Reset the working directory to the root of the project
WORKDIR /homeRentals

# Expose port 3000 to the outside world
EXPOSE 3000

# Define environment variable
ENV NODE_ENV=production

# Run npm start when the container launches
CMD ["npm", "start"]



