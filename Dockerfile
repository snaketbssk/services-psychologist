FROM node:20.10-alpine
ENV NODE_OPTIONS "export --openssl-legacy-provider"
ENV APP_ROOT /web

WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

RUN yarn install
RUN yarn build

CMD ["yarn", "run", "start"]
