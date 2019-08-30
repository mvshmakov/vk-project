#!/usr/bin/env bash
set -e

log() {
    local msg=$1
    echo -e $(tput setaf 2)$msg$(tput sgr0);
}

log_success() {
    local msg=$1
    echo -e $(tput setaf 3)$msg$(tput sgr0);
}

log_failure() {
    local msg=$1
    echo -e $(tput setaf 1)$msg$(tput sgr0);
}
