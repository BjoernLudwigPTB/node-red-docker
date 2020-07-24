# data_copy migration folder

This folder is mounted in the Node-RED application container and can be used to
transfer any data from inside the container to the host system. Its location
in the containers filesystem is /data_copy and its purpose is to transfer a
certain version of the files in the Node-RED data folder to or from the host
system.
