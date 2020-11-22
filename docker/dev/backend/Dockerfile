FROM node:12

VOLUME [ "/db-data" ]
EXPOSE 3000

RUN mkdir -p /db-data
# RUN npm install -g gulp-cli

WORKDIR /app

CMD sh -c "[ ! -f .init ] && npm install && touch .init; npm run watch" 
