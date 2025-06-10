# Stage 1: Build the application
FROM node:18-alpine AS build

# Install pnpm
RUN npm install -g pnpm@10.12.1

# Set working directory
WORKDIR /app

# Copy project manifest files for dependency installation
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Copy tsconfig for build process
COPY tsconfig.json ./
# Copy package.json from each workspace package to leverage Docker cache
COPY packages/material/package.json ./packages/material/
COPY packages/code-generator/package.json ./packages/code-generator/
COPY packages/website/package.json ./packages/website/

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Build the entire project
RUN pnpm run build:website

# Stage 2: Serve the application with Nginx
FROM nginx:1.25-alpine

# Copy built assets from the build stage
COPY --from=build /app/lowcode-dist /opt/lowcode-dist

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"] 