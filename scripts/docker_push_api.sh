#!/bin/bash

GIT_COMMIT=$1
docker push danielev22/hgop:API_$GIT_COMMIT || exit 1
