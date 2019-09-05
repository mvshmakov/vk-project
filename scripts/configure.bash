#!/usr/bin/env bash
set -e

source "$(cd "$(dirname "$BASH_SOURCE")"; pwd -P)"/helpers.bash

main() {
    local service=$arg
    log "Creating $service symlinks..."

    ln -sfn ../src ./node_modules/@;

    log_success "Symlinks for $service created"

    exit 0
}

configure_usage() {
    echo 'Usage: '"$BASH_SOURCE"' [-h|--help] [service]'
    echo
    echo 'Creates isomorphic symlinks for all services'
    echo
    echo 'Parameters:'
    echo '    service    "server" or "client" services'
    echo
    echo 'Example:'
    echo '    This will create symlinks for server'
    echo '    '"$BASH_SOURCE"' server'
    echo
}

arg=""

while [ $# -gt 0 ]; do
    case "$1" in
        (-h | --help) configure_usage; exit; ;;
        (-*) "invalid option $1"; configure_usage; exit 1;;
        (client | server) arg="$@"; break; ;;
        (*) "invalid argument $1"; configure_usage; exit 1;;
    esac
done

main
