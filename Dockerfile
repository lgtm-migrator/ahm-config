FROM node:10.16.3

ENV NPM_TOKEN_AHM ${NPM_TOKEN_AHM}
ENV GITHUB_OAUTH_TOKEN ${GITHUB_OAUTH_TOKEN}
ENV TZ=Australia/Melbourne

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN npm i -g npm@latest

WORKDIR /root/

COPY .npmrc /root
COPY .eslintrc /root
COPY .gintrc /root
COPY scripts /root/scripts
COPY test /root/test
COPY lib /root/lib
COPY package.json /root
COPY package-lock.json /root
COPY .git /.git

RUN npm i --quite
