FROM node:16-alpine
RUN npm install -g npm@7.24.0
RUN mkdir -p /var/www/orders
WORKDIR /var/www/orders
ADD . /var/www/orders
RUN npm install
CMD npm run build && npm run start:prod