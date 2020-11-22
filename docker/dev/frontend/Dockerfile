FROM node:12

VOLUME [ "/src" ]

WORKDIR /src

CMD sh -c "[ ! -f .init ] && npm install && touch .init; npm run serve" 
