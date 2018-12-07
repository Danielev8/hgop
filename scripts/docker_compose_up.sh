#!/bin/bash

export GIT_COMMIT=$1 
docker-compose down || exit 1
docker-compose up -d || exit 1