#!/bin/bash

GIT_COMMIT=$1
cd game-client || exit 1
docker build -t danielev22/hgop:UI$GIT_COMMIT . || exit 1