FROM node:12.13.1

WORKDIR /root/

COPY .npmrc /root/
COPY .eslintrc /var/app
COPY package.json /root/
COPY package-lock.json /root/

RUN npm install

COPY scripts /root/scripts
COPY .eslintignore /root/
COPY .eslintrc /root/
COPY test /root/test
COPY lib /root/lib
COPY .git /root/.git
