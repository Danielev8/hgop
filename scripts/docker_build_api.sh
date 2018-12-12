#!/bin/bash

GIT_COMMIT=$1
cd game-api || exit 1
docker build -t danielev22/hgop:API_$GIT_COMMIT . || exit 1