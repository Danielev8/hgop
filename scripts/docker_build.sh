#!/bin/bash

GIT_COMMIT=$1
cd game-api || exit 1
docker build -t danielev22/hgop:$GIT_COMMIT . || exit 1

cd ../game-client || exit 1
docker build -t danielev22/hgop:UI$GIT_COMMIT . || exit 1