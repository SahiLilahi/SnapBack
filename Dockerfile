# Stage 1: Build React app
FROM node:18 AS client-builder

WORKDIR /app/client

COPY client/package*.json ./
RUN npm install

COPY client/ .
RUN npm run build


# Stage 2: Set up Node.js server
FROM node:18

WORKDIR /app

# Copy server files
COPY server/package*.json ./server/
RUN cd server && npm install

# Copy server source
COPY server ./server

# Copy built React app from previous stage
COPY --from=client-builder /app/client/build ./server/public

# Expose server port
EXPOSE 5000

# Start the Node.js server
CMD ["node", "server/server.js"]
