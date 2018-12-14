#!/bin/bash

export GIT_COMMIT=$1 API_URL=$2 ENVIRONMENT=$3
docker-compose down
docker-compose up -d