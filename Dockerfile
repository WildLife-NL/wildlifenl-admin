FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/dist . 

RUN mkdir -p /var/cache/nginx /var/run /var/log/nginx && \
    chown -R 1001:0 /usr/share/nginx/html /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R g+rwX /usr/share/nginx/html /var/cache/nginx /var/run /var/log/nginx

USER 1001

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]