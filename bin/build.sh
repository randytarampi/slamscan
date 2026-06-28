#!/usr/bin/env bash

# NOTE-RT: Per https://stackoverflow.com/a/246128/1786400
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

docker run \
    --rm \
    --platform linux/amd64 \
    -v "${DIR}/..:/opt/app" \
    amazonlinux:2 \
    /bin/bash -c "cd /opt/app && ./bin/ec2-install.sh"
