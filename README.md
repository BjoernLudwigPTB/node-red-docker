# Node-RED-Docker by Björn Ludwig

[![CircleCI](https://circleci.com/gh/PTB-PSt1/node-red-docker/tree/node-red.svg?style=shield)](https://circleci.com/gh/PTB-PSt1/node-red-docker/tree/node-red)
[![Get your own version badge on microbadger.com](https://images.microbadger.com/badges/version/bludoc/node-red:latest.svg)](https://microbadger.com/images/bludoc/node-red:latest)
[![Get your own image badge on microbadger.com](https://images.microbadger.com/badges/image/bludoc/node-red:latest.svg)](https://microbadger.com/images/bludoc/node-red:latest)

This project is a fork of
[node-red/node-red-docker](https://github.com/node-red/node-red-docker) and as such
has support for multiple architectures (amd64, arm32v6, arm32v7, arm64v8, i386 and
s390x). Some basic familiarity with Docker and the [Docker Command
Line](https://docs.docker.com/engine/reference/commandline/cli/) is assumed.

It contains some customization and is used to get full control of the actual
contents of the repository. In addition it enables authentication via hard coded
users prepared in `settings.js` and serves the application at a different URL. The
default user only has read access to the flows. All users to gain write access need
to be added to `settings.js` as stated
[here](https://github.com/node-red/node-red-auth-github).

This project also provides the build for the `bludoc/node-red` container on
[DockerHub](https://hub.docker.com/r/bludoc/node-red/).

## Dependencies Node Red

 Node | Funktion
  --- | ---
  `node-red-node-msgpack`         | A Node-RED node to pack and unpack objects to msgpack format buffers.
  `node-red-node-base64`          | A Node-RED node to encode and decode base64 format messages.
  `node-red-node-suncalc`         | A Node-RED node to provide a signal at sunrise and sunset.
  `node-red-node-random`          | A Node-RED node that when triggered generates a random number between two values.
  `node-red-dashboard`            | This module provides a set of nodes in Node-RED to quickly create a live data dashboard.
  `node-red-node-openweathermap`  | A Node-RED node that gets the weather report and forecast from OpenWeatherMap.
  `unirest`                       | Unirest is a set of lightweight HTTP libraries available in multiple languages, built and maintained by Kong, who also maintain the open-source API Gateway Kong.
  `request`                       | Request is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default. (deprecated)
  `node-red-mongodb`              | A Node-RED node to save data in a MongoDB database.
  `node-red-contrib-mongodb2`     | MongoDB 2 driver node for Node-RED
  `node-red-node-twitter`         | Node-RED nodes to talk to Twitter.
  `node-red-contrib-objectid`     | This Node-Red node is to create an Object-Id for mongodb write operations from JSON inputs.
  `monodb`                        | MongoDB Nodejs Driver
  `xmlhttprequest`                | node-XMLHttpRequest is a wrapper for the built-in http client to emulate the browser XMLHttpRequest object.
  `jquery`                        | Nodejs package
  `node-red-contrib-uibuilder`    | A Node-RED web user interface builder. UIbuilder Aims to Provide an easy to use way to create dynamic web interfaces using any (or no) front end libraries for convenience.

## Quick Start

To run in Docker in its simplest form just run:

```
docker run -it -p 1880:1880 --name mynodered bludoc/node-red
```

Let's dissect that command:

```
docker run        - run this container, initially building locally if necessary
-it               - attach a terminal session so we can see what is going on
-p 1880:1880      - connect local port 1880 to the exposed internal port 1880
--name mynodered  - give this machine a friendly local name
bludoc/node-red   - the image to base it on - currently Node-RED v1.0.3
```

Running that command should give a terminal window with a running instance of Node-RED.

```
Welcome to Node-RED
===================

03 Oct 12:57:10 - [info] Node-RED version: v1.0.3
03 Oct 12:57:10 - [info] Node.js  version: v10.16.3
03 Oct 12:57:10 - [info] Linux 4.9.184-linuxkit x64 LE
03 Oct 12:57:11 - [info] Loading palette nodes
03 Oct 12:57:16 - [info] Settings file  : /data/settings.js
03 Oct 12:57:16 - [info] Context store  : 'default' [module=memory]
03 Oct 12:57:16 - [info] User directory : /data
03 Oct 12:57:16 - [warn] Projects disabled : editorTheme.projects.enabled=false
03 Oct 12:57:16 - [info] Flows file     : /data/flows.json
03 Oct 12:57:16 - [info] Creating new flow file
03 Oct 12:57:17 - [warn]

---------------------------------------------------------------------
Your flow credentials file is encrypted using a system-generated key.

If the system-generated key is lost for any reason, your credentials
file will not be recoverable, you will have to delete it and re-enter
your credentials.

You should set your own key using the 'credentialSecret' option in
your settings file. Node-RED will then re-encrypt your credentials
file using your chosen key the next time you deploy a change.
---------------------------------------------------------------------

03 Oct 12:57:17 - [info] Starting flows
03 Oct 12:57:17 - [info] Started flows
03 Oct 12:57:17 - [info] Server now running at http://127.0.0.1:1880/

[...]
```

You can then browse to `http://{host-ip}:1880/node-red` to get the familiar Node-RED
desktop.

The advantage of doing this is that by giving it a name (mynodered) we can manipulate
it more easily, and by fixing the host port we know we are on familiar ground. Of
course this does mean we can only run one instance at a time... but one step at a
time folks...

If we are happy with what we see, we can detach the terminal with `Ctrl-p`
`Ctrl-q` - the container will keep running in the background.

To reattach to the terminal (to see logging) run:

```
$ docker attach mynodered
```

If you need to restart the container (e.g. after a reboot or restart of the Docker
daemon):

```
$ docker start mynodered
```

and stop it again when required:

```
$ docker stop mynodered
```

**Healthcheck**: to turn off the Healthcheck add `--no-healthcheck` to the run command.

## Image Variations

The Node-RED images come in different variations and are supported by manifest lists
(auto-detect architecture). This makes it more easy to deploy in a multi architecture
Docker environment. E.g. a Docker Swarm with mix of Raspberry Pi's and amd64 nodes.

The tag naming convention is
`<node-red-version>-<node-version>-<image-type>-<architecture>`, where:

- `<node-red-version>` is the Node-RED version.
- `<node-version>` is the Node JS version.
- `<image-type>` is type of image and is optional, can be either _none_ or minimal.
  - _none_ : is the default and has Python 2 & Python 3 + devtools installed
  - minimal : has no Python installed and no devtools installed
- `<architecture>` is the architecture of the Docker host system, can be either
  amd64, arm32v6, arm32v7, arm64, s390x or i386.

The minimal versions (without python and build tools) are not able to install nodes
that require any locally compiled native code.

For example - to run the latest minimal version, you would run

```
docker run -it -p 1880:1880 --name mynodered nodered/node-red:latest-minimal
```

The Node-RED images are based on [official Node JS Alpine
Linux](https://hub.docker.com/_/node/) images to keep them as small as possible.
Using Alpine Linux reduces the built image size, but removes standard dependencies
that are required for native module compilation. If you want to add dependencies
with native dependencies, extend the Node-RED image with the missing packages on
running containers or build new images see [docker-custom](docker-custom/README.md).

The following table shows the variety of provided Node-RED images.

| **Tag**                    |**Node**| **Arch** | **Python** |**Dev**| **Base Image**         |
|----------------------------|--------|----------|------------|-------|------------------------|
| 1.1.2-10-amd64             |   10   | amd64    |   2.x 3.x  |  yes  | amd64/node:10-alpine   |
| 1.1.2-10-arm32v6           |   10   | arm32v6  |   2.x 3.x  |  yes  | arm32v6/node:10-alpine |
| 1.1.2-10-arm32v7           |   10   | arm32v7  |   2.x 3.x  |  yes  | arm32v7/node:10-alpine |
| 1.1.2-10-arm64v8           |   10   | arm64v8  |   2.x 3.x  |  yes  | arm64v8/node:10-alpine |
| 1.1.2-10-s390x             |   10   | s390x    |   2.x 3.x  |  yes  | s390x/node:10-alpine   |
| 1.1.2-10-i386              |   10   | i386     |   2.x 3.x  |  yes  | i386/node:10-alpine    |
|                            |        |          |            |       |                        |
| 1.1.2-10-minimal-amd64     |   10   | amd64    |     no     |  no   | amd64/node:10-alpine   |
| 1.1.2-10-minimal-arm32v6   |   10   | arm32v6  |     no     |  no   | arm32v6/node:10-alpine |
| 1.1.2-10-minimal-arm32v7   |   10   | arm32v7  |     no     |  no   | arm32v7/node:10-alpine |
| 1.1.2-10-minimal-arm64v8   |   10   | arm64v8  |     no     |  no   | arm64v8/node:10-alpine |
| 1.1.2-10-minimal-s390x     |   10   | s390x    |     no     |  no   | s390x/node:10-alpine   |
| 1.1.2-10-minimal-i386      |   10   | i386     |     no     |  no   | i386/node:10-alpine    |


| **Tag**                    |**Node**| **Arch** | **Python** |**Dev**| **Base Image**         |
|----------------------------|--------|----------|------------|-------|------------------------|
| 1.1.2-12-amd64             |   12   | amd64    |   2.x 3.x  |  yes  | amd64/node:12-alpine   |
| 1.1.2-12-arm32v6           |   12   | arm32v6  |   2.x 3.x  |  yes  | arm32v6/node:12-alpine |
| 1.1.2-12-arm32v7           |   12   | arm32v7  |   2.x 3.x  |  yes  | arm32v7/node:12-alpine |
| 1.1.2-12-arm64v8           |   12   | arm64v8  |   2.x 3.x  |  yes  | arm64v8/node:12-alpine |
| 1.1.2-12-s390x             |   12   | s390x    |   2.x 3.x  |  yes  | s390x/node:12-alpine   |
| 1.1.2-12-i386              |   12   | i386     |   2.x 3.x  |  yes  | i386/node:12-alpine    |
|                            |        |          |            |       |                        |
| 1.1.2-12-minimal-amd64     |   12   | amd64    |     no     |  no   | amd64/node:12-alpine   |
| 1.1.2-12-minimal-arm32v6   |   12   | arm32v6  |     no     |  no   | arm32v6/node:12-alpine |
| 1.1.2-12-minimal-arm32v7   |   12   | arm32v7  |     no     |  no   | arm32v7/node:12-alpine |
| 1.1.2-12-minimal-arm64v8   |   12   | arm64v8  |     no     |  no   | arm64v8/node:12-alpine |
| 1.1.2-12-minimal-s390x     |   12   | s390x    |     no     |  no   | s390x/node:12-alpine   |
| 1.1.2-12-minimal-i386      |   12   | i386     |     no     |  no   | i386/node:12-alpine    |

- All images have bash, tzdata, nano, curl, git, openssl and openssh-client pre-installed to support Node-RED's Projects feature.

## Manifest Lists
The following table shows the provided Manifest Lists.

| **Tag**                                | **Node-RED Base Image**                    |
|----------------------------------------|--------------------------------------------|
| latest, 1.1.2,                         | nodered/node-red:1.1.2-10-amd64            |
| latest-10, 1.1.2-10                    | nodered/node-red:1.1.2-10-arm32v6          |
|                                        | nodered/node-red:1.1.2-10-arm32v7          |
|                                        | nodered/node-red:1.1.2-10-arm64v8          |
|                                        | nodered/node-red:1.1.2-10-s390x            |
|                                        | nodered/node-red:1.1.2-10-i386             |
|                                        |                                            |
| latest-minimal, 1.1.2-minimal,         | nodered/node-red:1.1.2-10-amd64-minimal    |
| latest-10-minimal, 1.1.2-10-minimal    | nodered/node-red:1.1.2-10-arm32v6-minimal  |
|                                        | nodered/node-red:1.1.2-10-arm32v7-minimal  |
|                                        | nodered/node-red:1.1.2-10-arm64v8-minimal  |
|                                        | nodered/node-red:1.1.2-10-s390x-minimal    |
|                                        | nodered/node-red:1.1.2-10-i386-minimal     |

| **Tag**                                | **Node-RED Base Image**                    |
|----------------------------------------|--------------------------------------------|
| latest-12, 1.1.2-12                    | nodered/node-red:1.1.2-12-amd64            |
|                                        | nodered/node-red:1.1.2-12-arm32v6          |
|                                        | nodered/node-red:1.1.2-12-arm32v7          |
|                                        | nodered/node-red:1.1.2-12-arm64v8          |
|                                        | nodered/node-red:1.1.2-12-s390x            |
|                                        | nodered/node-red:1.1.2-12-i386             |
|                                        |                                            |
| latest-12-minimal, 1.1.2-12-minimal    | nodered/node-red:1.1.2-12-amd64-minimal    |
|                                        | nodered/node-red:1.1.2-12-arm32v6-minimal  |
|                                        | nodered/node-red:1.1.2-12-arm32v7-minimal  |
|                                        | nodered/node-red:1.1.2-12-arm64v8-minimal  |
|                                        | nodered/node-red:1.1.2-12-s390x-minimal    |
|                                        | nodered/node-red:1.1.2-12-i386-minimal     |

With the support of Docker manifest list, there is no need to explicitly add the tag for the architecture to use.
When a docker run command or docker service command or docker stack command is executed, docker checks which architecture is required and verifies if it is available in the docker repository. If it does, docker pulls the matching image for it.

Therefore all tags regarding Raspberry PI's are dropped.

For example: suppose you are running on a Raspberry PI 3B, which has `arm32v7` as architecture. Then just run the following command to pull the image (tagged by `1.0.3-10-arm32v7`), and run the container.

```
docker run -it -p 1880:1880 --name mynodered nodered/node-red:latest
```

The same command can be used for running on an amd64 system, since docker discovers its running on a amd64 host and pulls the image with the matching tag (`1.1.2-10-amd64`).

This gives the advantage that you don't need to know/specify which architecture you are running on and makes docker run commands and docker compose files more flexible and exchangeable across systems.

**Note**: Currently there is a bug in Docker's architecture detection that fails for `arm32v6` - eg Raspberry Pi Zero or 1. For these devices you currently need to specify the full image tag, for example:

```
docker run -it -p 1880:1880 --name mynodered nodered/node-red:1.1.2-10-minimal-arm32v6
```

## Raspberry PI - native GPIO support
| v1.0 - BREAKING: Native GPIO support for Raspberry PI has been dropped |
| --- |
The replacement for native GPIO is [node-red-node-pi-gpiod](https://github.com/node-red/node-red-nodes/tree/master/hardware/pigpiod).

Disadvantages of the native GPIO support are:

- Your Docker container needs to be deployed on the same Docker node/host on which you want to control the gpio.
- Gain access to `/dev/mem` of your Docker node/host
- privileged=true is not supported for `docker stack` command

`node-red-node-pi-gpiod` fixes all these disadvantages. With `node-red-node-pi-gpiod` it is possible to interact with gpio of multiple Raspberry Pi's from a single Node-RED container, and for multiple containers to access different gpio on the same Pi.

### Quick Migration steps to `node-red-node-pi-gpiod`

1. Install `node-red-node-pi-gpiod` through the Node-RED palette
1. Install and run `PiGPIOd daemon` on the host Pi.
1. Replace all native gpio nodes with `pi gpiod` nodes.
1. Configure `pi gpiod` nodes to connect to `PiGPIOd daemon`. Often the host machine will have an IP 172.17.0.1 port 8888 - but not always. You can use `docker exec -it mynodered ip route show default | awk '/default/ {print $3}'` to check.

For detailed install instruction please refer to the `node-red-node-pi-gpiod` [README](https://github.com/node-red/node-red-nodes/tree/master/hardware/pigpiod#node-red-node-pi-gpiod)

**Note**: There is a contributed [gpiod project](https://github.com/corbosman/node-red-gpiod) that runs the gpiod in its own container rather than on the host if required.

## Managing User Data

Once you have Node-RED running with Docker, we need to
ensure any added nodes or flows are not lost if the container is destroyed.
This user data can be persisted by mounting a data directory to a volume outside
the container. This can either be done using a bind mount or a named data volume.

Node-RED uses the `/data` directory inside the container to store user configuration data.

Depending on how and where you mount the user data directory you may want to turn off the built in healthcheck function by adding `--no-healthcheck` to the run command.

### Using a Host Directory for Persistence (Bind Mount)
To save your Node-RED user directory inside the container to a host directory outside the container, you can use the
command below. To allow access to this host directory, the node-red user (default uid=1000) inside the container must
have the same uid as the owner of the host directory.

```
docker run -it -p 1880:1880 -v /home/pi/.node-red:/data --name mynodered bludoc/node-red
```

In this example the host `/home/pi/.node-red` directory is bound to the container `/data` directory.

**Note**: Users migrating from version 0.20 to 1.0 will need to ensure that any existing `/data`
directory has the correct ownership. As of 1.0 this needs to be `1000:1000`. This can be forced by
the command `sudo chown -R 1000:1000 path/to/your/node-red/data`

See [the wiki](https://github.com/node-red/node-red-docker/wiki/Permissions-and-Persistence) for detailed information
on permissions.

### Using Named Data Volumes

Docker also supports using named [data volumes](https://docs.docker.com/engine/tutorials/dockervolumes/)
to store persistent or shared data outside the container.

To create a new named data volume to persist our user data and run a new
container using this volume.

```
$ docker volume create --name node_red_user_data
$ docker volume ls
DRIVER              VOLUME NAME
local               node_red_user_data
$ docker run -it -p 1880:1880 -v node_red_user_data:/data --name mynodered bludoc/node-red
```

Using Node-RED to create and deploy some sample flows, we can now destroy the
container and start a new instance without losing our user data.

```
$ docker rm mynodered
$ docker run -it -p 1880:1880 -v node_red_user_data:/data --name mynodered bludoc/node-red
```

## Updating

As the /data is now preserved outside of the container, updating the base container
image is now as simple as

```
$ docker pull bludoc/node-red
$ docker stop mynodered
$ docker start mynodered
```

## Docker Stack / Docker Compose

Below an example of a Docker Compose file which can be run by `docker stack` or `docker-compose`.
Please refer to the official Docker pages for more info about [Docker stack](https://docs.docker.com/engine/reference/commandline/stack/) and [Docker compose](https://docs.docker.com/compose/).

```
################################################################################
# Node-RED Stack or Compose
################################################################################
# docker stack deploy node-red --compose-file docker-compose-node-red.yml
# docker-compose -f docker-compose-node-red.yml -p myNoderedProject up
################################################################################
version: "3.7"

services:
  node-red:
    image: bludoc/node-red:latest
    environment:
      - TZ=Europe/Amsterdam
    ports:
      - "1880:1880"
    networks:
      - node-red-net
    volumes:
      - ~/node-red/data:/data

networks:
  node-red-net:
```

The above compose file:

- creates a node-red service
- pulls the latest node-red image
- sets the timezone to Europe/Amsterdam
- Maps the container port 1880 to the the host port 1880
- creates a node-red-net network and attaches the container to this network
- persists the `/data` dir inside the container to the users local `node-red/data` directory. The `node-red/data` directory must exist prior to starting the container.

## Project Layout

This repository contains Dockerfiles to build the Node-RED Docker images listed above.

### package.json

The package.json is a metafile that downloads and installs the required version
of Node-RED and any other npms you wish to install at build time. During the
Docker build process, the dependencies are installed under `/opt/node-red`.

The main sections to modify are

```
"dependencies": {
    "node-red": "^1.0.3",           <-- set the version of Node-RED here
    "node-red-dashboard": "*"        <-- add any extra npm packages here
},
```

This is where you can pre-define any extra nodes you want installed every time
by default, and then

```
"scripts"      : {
    "start": "node-red -v $FLOWS"
},
```

This is the command that starts Node-RED when the container is run.

### Startup

Node-RED is started using NPM start from this `/opt/node-red`, with the `--userDir`
parameter pointing to the `/data` directory on the container.

The flows configuration file is set using an environment parameter (**FLOWS**),
which defaults to *'flows.json'*. This can be changed at runtime using the
following command-line flag.

```
docker run -it -p 1880:1880 -e FLOWS=my_flows.json bludoc/node-red
```

**Note**: If you set `-e FLOWS=""` then the flow file can be set via the *flowFile*
property in the `settings.js` file.

Node.js runtime arguments can be passed to the container using an environment
parameter (**NODE_OPTIONS**). For example, to fix the heap size used by
the Node.js garbage collector you would use the following command.

```
docker run -it -p 1880:1880 -e NODE_OPTIONS="--max_old_space_size=128" bludoc/node-red
```

Other useful environment variables include

- -e NODE_RED_ENABLE_SAFE_MODE=false # setting to true starts Node-RED in safe (not running) mode
- -e NODE_RED_ENABLE_PROJECTS=false  # setting to true starts Node-RED with the projects feature enabled

### Node-RED Admin Tool

Using the administration tool, with port forwarding on the container to the host
system, extra nodes can be installed without leaving the host system.

```
$ npm install -g node-red-admin
$ node-red-admin install node-red-node-openwhisk
```

This tool assumes Node-RED is available at the following address
`http://localhost:1880`.

Refreshing the browser page should now reveal the newly added node in the palette.

### Container Shell

```
$ docker exec -it mynodered /bin/bash
```

Will give a command line inside the container - where you can then run the npm install
command you wish - e.g.

```
$ cd /data
$ npm install node-red-node-smooth
$ exit
$ docker stop mynodered
$ docker start mynodered
```

Refreshing the browser page should now reveal the newly added node in the palette.

### Building Custom Image

Creating a new Docker image, using this public Node-RED image as the base image,
allows you to install extra nodes during the build process.

This Dockerfile builds a custom Node-RED image with the flightaware module
installed from NPM.

```
FROM bludoc/node-red
RUN npm install node-red-contrib-flightaware
```

Alternatively, you can modify the package.json in this repository and re-build
the images from scratch. This will also allow you to modify the version of

## Managing User Data

Once you have customised the Node-RED instance running with Docker, we need to
ensure these modifications are not lost if the container is destroyed. Managing
this user data can be handed by persisting container state into a new image or
using named data volumes to handle move this data outside the container.

### Saving Changes As Custom Image

Modifications to files within the live container, e.g. manually adding nodes or
creating flows, do not exist outside the lifetime of the container. If that
container instance is destroyed, these changes will be lost.

Docker allows you to the current state of a container to a new image. This
means you can persist your changes as a new image that can be shared on other
systems.

```
$ docker commit mynodered custom-node-red-docker
```

If we destroy the ```mynodered``` container, the instance can be recovered by
spawning a new container using the ```custom-node-red-docker``` image.

### Using Named Data Volumes

Docker supports using [data volumes](https://docs.docker.com/engine/tutorials/dockervolumes/) to store
persistent or shared data outside the container. Files and directories within data
volumes exist outside of the lifecycle of containers, i.e. the files still exist
after removing the container.

Node-RED uses the `/data` directory to store user configuration data.

Mounting a data volume inside the container at this directory path means user
configuration data can be saved outside of the container and even shared between
container instances.

Let's create a new named data volume to persist our user data and run a new
container using this volume.

```
$ docker volume create --name node_red_user_data
$ docker volume ls
DRIVER              VOLUME NAME
local               node_red_user_data
$ docker run -it -p 1880:1880 -v node_red_user_data:/data --name mynodered bludoc/node-red
```

Using Node-RED to create and deploy some sample flows, we can now destroy the
container and start a new instance without losing our user data.

```
$ docker rm mynodered
$ docker run -it -p 1880:1880 -v node_red_user_data:/data --name mynodered bludoc/node-red
```

## Updating

Updating the base container image is as simple as

```
$ docker pull bludoc/node-red
$ docker stop mynodered
$ docker start mynodered
```

## Running headless

The barest minimum we need to just run Node-RED is

  $ docker run -d -p 1880:1880 bludoc/node-red

This will create a local running instance of a machine - that will have some
docker id number and be running on a random port... to find out run

```
$ docker ps -a
CONTAINER ID        IMAGE                       COMMAND             CREATED             STATUS                     PORTS                     NAMES
4bbeb39dc8dc        bludoc/node-red:latest   "npm start"         4 seconds ago       Up 4 seconds               0.0.0.0:49154->1880/tcp   furious_yalow
$
```

You can now point a browser to the host machine on the tcp port reported back, so
in the exampleabove browse to  `http://{host ip}:49154`

## Linking Containers

You can link containers "internally" within the docker runtime by using the --link option.

For example I have a simple MQTT broker container available as

```
$ docker run -it --name mybroker bludoc/node-red
$ docker run -it --name mybroker eclipse-mosquitto
```

(no need to expose the port 1883 globally unless you want to... as we do magic below)

Then run nodered docker - but this time with a link parameter (name:alias)

```
$ docker run -it -p 1880:1880 --name mynodered --link mybroker:broker bludoc/node-red
```

the magic here being the `--link` that inserts a entry into the node-red instance
hosts file called *broker* that links to the external mybroker instance....  but we do
expose the 1880 port so we can use an external browser to do the node-red editing.

Then a simple flow like below should work - using the alias *broker* we just set up a
second ago.

```
[{"id":"190c0df7.e6f3f2","type":"mqtt-broker","broker":"broker","port":"1883","clientid":""},{"id":"37963300.c869cc","type":"mqtt in","name":"","topic":"test","broker":"190c0df7.e6f3f2","x":226,"y":244,"z":"f34f9922.0cb068","wires":[["802d92f9.7fd27"]]},{"id":"edad4162.1252c","type":"mqtt out","name":"","topic":"test","qos":"","retain":"","broker":"190c0df7.e6f3f2","x":453,"y":135,"z":"f34f9922.0cb068","wires":[]},{"id":"13d1cf31.ec2e31","type":"inject","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":226,"y":157,"z":"f34f9922.0cb068","wires":[["edad4162.1252c"]]},{"id":"802d92f9.7fd27","type":"debug","name":"","active":true,"console":"false","complete":"false","x":441,"y":261,"z":"f34f9922.0cb068","wires":[]}]
```

This way the internal broker is not exposed outside of the docker host - of course
you may add `-p 1883:1883`  etc to the broker run command if you want to see it...

### Docker-Compose linking example

Another way to link containers is by using docker-compose. The following docker-compose.yml
file creates a Node-RED instance, and a local MQTT broker instance. In the Node-RED
flow the broker can be addressed simply as `broker` at its default port `1883`.

```
version: "3.7"

services:
  node-red:
    image: nodered/node-red
    restart: unless-stopped
    volumes:
      - /home/pi/.node-red:/data
    ports:
      - 1880:1880

  broker:
    image: eclipse-mosquitto
    restart: unless-stopped
```

## Common Issues and Hints

Here is a list of common issues users have reported with possible solutions.

### User Permission Errors

See
[the wiki](https://github.com/node-red/node-red-docker/wiki/Permissions-and-Persistence)
for detailed information on permissions.

If you are seeing *permission denied* errors opening files or accessing host devices,
try running the container as the root user.

```
$ docker run -it -p 1880:1880 --name mynodered --user=root bludoc/node-red
```

References:

https://github.com/node-red/node-red/issues/15

https://github.com/node-red/node-red/issues/8

### Accessing Host Devices

If you want to access a device from the host inside the container, e.g. serial port,
use the following command-line flag to pass access through.

```
docker run -it -p 1880:1880 --name mynodered --device=/dev/ttyACM0 bludoc/node-red
```
References:
https://github.com/node-red/node-red/issues/15

### Setting Timezone

If you want to modify the default timezone, use the TZ environment variable with the
[relevant timezone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

```
docker run -it -p 1880:1880 --name mynodered -e TZ="Europe/London" bludoc/node-red
```

References:
https://groups.google.com/forum/#!topic/node-red/ieo5IVFAo2o
