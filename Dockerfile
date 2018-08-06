# This file was changed for customization purposes. Specifically settings.json
# is customized.

ARG NODE_VERSION=6
FROM node:${NODE_VERSION}
MAINTAINER Bjoern Ludwig <bjoern.ludwig@ptb.de>

# Create home directory for Node-RED application source code and data
# directory for flows, config and nodes.

RUN mkdir -p /usr/src/node-red && mkdir /data

WORKDIR /usr/src/node-red

# Add user not to run application as root

RUN useradd --home-dir /usr/src/node-red --no-create-home node-red \
    && chown -R node-red:node-red /data \
    && chown -R node-red:node-red /usr/src/node-red
	
USER node-red

# package.json contains Node-RED NPM module and node dependencies
COPY package.json /usr/src/node-red/

USER root

RUN npm install

WORKDIR /data

# Change settings'js according to custom needs.
RUN cp /usr/src/node-red/node_modules/node-red/settings.js .

RUN sed -i "s_//httpRoot:.*_httpRoot: '\node-red'_g" settings.js
RUN sed -i 's_\(.*\)//adminAuth:.*_\1adminAuth: {\n \
    type: "credentials",\n \
    users: [{\n \
        username: "admin",\n \
        password: "$2a$08$zjW7yTSNgDO1WkEkCVU05OW5/iyiagITcNmVPjZkJk7qNjTotNme2",\n \
        permissions: "*"\n \
    },\n \
	{\n \
        username: "ludwig10",\n \
        password: "$2a$08$zqNNBGzJXbjTan6rJq1RfOPdO8HKqpIzD7jYfh2PhEitj9p.o8otC",\n \
        permissions: "*"\n \
    }\n \
	],\n \
	default: {\n \
        permissions: "read"\n \
    }\n \
}\n \
//delete this and the following seven lines_g' settings.js

RUN sed -i -e '/\/\/delete this and the following seven lines/,+7d' settings.js

EXPOSE 1880

# Environment variable holding file path for flows configuration
ENV FLOWS=flows.json

ENV NODE_PATH=/usr/src/node-red/node_modules:/data/modules

CMD ["npm", "start", "--", "--userDir", "/data"]
