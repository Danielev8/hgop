#!/bin/bash

GIT_COMMIT=$1
cd game-client || exit 1
docker build -t danielev22/hgop:CLIENT_$GIT_COMMIT . || exit 1