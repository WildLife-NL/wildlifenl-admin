FROM node:20.17.0-alpine AS build 

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --production

COPY . .

ARG OPENSHIFT_BUILD_REFERENCE
ARG SOURCE_REF
ARG GIT_BRANCH
ARG GITHUB_REF_NAME
ENV OPENSHIFT_BUILD_REFERENCE=$OPENSHIFT_BUILD_REFERENCE \
    SOURCE_REF=$SOURCE_REF \
    GIT_BRANCH=$GIT_BRANCH \
    GITHUB_REF_NAME=$GITHUB_REF_NAME

RUN npm run build

FROM nginx:alpine

RUN chmod -R 777 /var/log/nginx /var/cache/nginx/ \
&& chmod -R 777 /var/run \
&& chmod -R 777 /etc/nginx/*

COPY --from=build /usr/src/app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
COPY docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod 755 /docker-entrypoint.sh \
    && chmod -R 777 /usr/share/nginx/html

EXPOSE 8080

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]