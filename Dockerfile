FROM node:16 as development
WORKDIR /usr/src/build

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build:document

FROM nginx
COPY --from=development /usr/src/build/docs /usr/share/nginx/html
EXPOSE 80 443