# This file was changed for customization purposes. Specifically settings.json
# is customized.

ARG NODE_VERSION=8
FROM node:${NODE_VERSION}
LABEL maintainer="Bjoern Ludwig <bjoern.ludwig@ptb.de>"

# Home directory for Node-RED application source code.
RUN mkdir -p /opt/node-red

# User data directory, contains flows, config and nodes.
RUN mkdir /data

WORKDIR /opt/node-red

# Add node-red user so we aren't running as root.
RUN useradd --home-dir /opt/node-red --no-create-home node-red \
    && chown -R node-red:node-red /data \
    && chown -R node-red:node-red /opt/node-red
	
USER node-red

# package.json contains Node-RED NPM module and node dependencies
COPY package.json /opt/node-red/
RUN npm install

WORKDIR /data

# Change settings'js according to custom needs.
RUN cp /opt/node-red/node_modules/node-red/settings.js .

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

WORKDIR /opt/node-red

# User configuration directory volume
EXPOSE 1880

# Environment variable holding file path for flows configuration
ENV FLOWS=flows.json
ENV NODE_PATH=/opt/node-red/node_modules:/data/modules

CMD ["npm", "start", "--", "--userDir", "/data"]
