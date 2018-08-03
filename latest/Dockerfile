# This file was changed for customization purposes. Specifically paths are
# changed slightly to match common naming and to support habbits in contexts
# where this version is supposed to be used.

ARG NODE_VERSION=6
FROM node:${NODE_VERSION}
MAINTAINER Bjoern Ludwig <bjoern.ludwig@ptb.de>

# Create home directory for Node-RED application source code and data
# directory for flows, config and nodes.

RUN mkdir -p /opt/node-red && mkdir -p /data

WORKDIR /opt/node-red

# Add user not to run application as root

RUN useradd --home-dir /usr/src/node-red --no-create-home node-red \
    && chown -R node-red:node-red /opt/node-red \
    && chown -R node-red:node-red /data
	
USER node-red

# package.json contains Node-RED NPM module and node dependencies
COPY package.json /opt/node-red/

USER root

RUN npm install

# Change settings'js according to custom needs.

WORKDIR /data

RUN sed -i "s_//httpRoot:.*_httpRoot: '\node-red'_g" settings.js
RUN sed -i 's_\(.*\)//adminAuth:.*_\1adminAuth: require('node-red-auth-github')({\n
    clientID: GITHUB_CLIENT_ID,\n
    clientSecret: GITHUB_CLIENT_SECRET,\n
    baseURL: "https://pstwiki.bs.ptb.de/node-red",\n
    users: [
       { username: "BjoernLudwigPTB",permissions: ["*"]}\n
    ]\n
})\n
//delete this and the following seven lines_g' settings.js

RUN sed -i -e '/\/\/delete this and the following seven lines/,+7d' settings.js

EXPOSE 1880

# Environment variable holding file path for flows configuration
ENV FLOWS=flows.json

ENV NODE_PATH=/opt/node-red/node_modules:/data/modules

CMD ["npm", "start", "--", "--userDir", "/data"]
