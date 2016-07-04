#!/bin/bash
REMOTE_WEBROOT_FOLDER="/var/www/staging/"
RANDOM_FILENAME=$(hexdump -n 16 -v -e '/1 "%02X"' /dev/urandom)
REMOTE_COMMAND="cd $REMOTE_WEBROOT_FOLDER && (rm -rf *.*) && mv ~/${RANDOM_FILENAME}.tar.gz . && tar -xf ${RANDOM_FILENAME}.tar.gz"
cd build/ \
&& tar -zcvf $RANDOM_FILENAME.tar.gz * \
&& scp $RANDOM_FILENAME.tar.gz root@ec2-52-221-254-67.ap-southeast-1.compute.amazonaws.com:~ \
&& ssh root@ec2-52-221-254-67.ap-southeast-1.compute.amazonaws.com $REMOTE_COMMAND
