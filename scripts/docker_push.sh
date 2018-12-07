#!/bin/bash

GIT_COMMIT=$1 || exit 1
docker push danielev22/hgop:$GIT_COMMIT || exit 1