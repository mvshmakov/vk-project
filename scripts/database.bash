#!/usr/bin/env bash
set -e

source "$(cd "$(dirname "$BASH_SOURCE")"; pwd -P)"/helpers.bash

script_name="$0"

main() {
    log "Launching database..."
    set +e

    output="$(docker run --name mongo -v $(pwd)/mongo/data:/data/db -p 27017:27017 -d mongo 2>docker-mongo.err)"

    if [[ -s docker-mongo.err ]]; then
        if cat docker-mongo.err | grep -q -e "Conflict"; then
            log_success "Database with alias \"/mongo\" is already in use"
        elif cat docker-mongo.err | grep -q -e "Pulling"; then
            cat docker-mongo.err
        else
            log_failure "Cannot launch database, check error message:"

            cat docker-mongo.err
            rm -f ./docker-mongo.err

            exit 1
        fi
    fi

    log_success "Database is up"
    rm -f ./docker-mongo.err

    set -e
    exit 0
}

main
