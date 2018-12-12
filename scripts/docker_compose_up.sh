#!/bin/bash

export GIT_COMMIT=$1 API_URL=${API_URL}
docker-compose down
docker-compose up -d