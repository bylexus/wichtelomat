FROM node:17 AS builder
WORKDIR /src
COPY . /src

ENV NODE_ENV=development
RUN npm install
ENV NODE_ENV=production
RUN npm run build


###########################################################
FROM httpd:2.4 AS prod

LABEL maintainer="Alexander Schenkel <alex-der-wichtel@alexi.ch>"

ENV NODE_ENV=production
COPY --from=builder /src/dist /usr/local/apache2/htdocs
