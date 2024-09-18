# Use Node.js 20
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# Expose the port (make sure this matches with your app)
EXPOSE 9000

# Start the application
CMD [ "node", "server.js" ]
