#!/bin/bash

GIT_COMMIT=$1
docker push danielev22/hgop:$GIT_COMMIT || exit 1
docker push danielev22/hgop:UI$GIT_COMMIT || exit 1