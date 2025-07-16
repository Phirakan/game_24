FROM node:20-alpine

# Install dependencies
WORKDIR /app
COPY . .
RUN npm install

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 3333

# Start server
CMD ["node", "./build/server.js"]
