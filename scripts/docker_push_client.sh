#!/bin/bash

GIT_COMMIT=$1
docker push danielev22/hgop:CLIENT_$GIT_COMMIT || exit 1
