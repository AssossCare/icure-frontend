FROM node:8 as builder

RUN mkdir -p /usr/src
WORKDIR /usr/src
RUN chown -R node .

# copy env
COPY --chown=node package* ./

USER node

# npm
RUN npm install --quiet

# copy code
COPY --chown=node tsconfig.json ./
COPY --chown=node $wpc ./
COPY --chown=node app app/

# webpack
ARG wpc=webpack.config.js
ARG task=build
RUN npm run $task

FROM nginx:1.14.2-alpine

# nginx
RUN apk add --no-cache nginx-mod-http-headers-more
COPY docker/nginx.conf /etc/nginx/nginx.conf
ARG dist=dist
COPY --from=builder /usr/src/$dist/ /usr/share/nginx/html/

# cmd
CMD exec nginx -g 'daemon off;'
