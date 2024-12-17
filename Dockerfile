FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json tsconfig.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript
# RUN npm run build

# Start the application
CMD ["node", "--loader", "ts-node/esm", "src/scheduler.ts"]
