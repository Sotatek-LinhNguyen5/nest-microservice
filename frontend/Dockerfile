FROM node:16-alpine
RUN npm install -g npm@7.24.0
RUN mkdir -p /var/www/frontend
WORKDIR /var/www/frontend
ADD . /var/www/frontend
RUN npm install
CMD npm run build && npm run start:prod