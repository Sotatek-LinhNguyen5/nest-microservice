FROM node:16-alpine
RUN npm install -g npm@7.24.0
RUN mkdir -p /var/www/payments
WORKDIR /var/www/payments
ADD . /var/www/payments
RUN npm install
CMD npm run build && npm run start:prod