# Stage 1: Build the frontend app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy app source and build
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Set working directory for Nginx
WORKDIR /usr/share/nginx/html

# Clean the default HTML directory
RUN rm -rf ./*

# Copy built frontend files from the builder stage
COPY --from=builder /app/dist . 

# Ensure necessary directories exist and have correct permissions
RUN mkdir -p /var/cache/nginx /var/run /var/log/nginx && \
    chown -R 1001:0 /usr/share/nginx/html /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R g+rwX /usr/share/nginx/html /var/cache/nginx /var/run /var/log/nginx

# Expose the correct port
EXPOSE 8080

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]