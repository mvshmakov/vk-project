#!/usr/bin/env bash
set -e

windows() { [[ -n "$WINDIR" ]]; }

if windows; then
    cmd <<< "mklink /D \"@\" \"..\/src\"" > /dev/null
else
    ln -sfn \"..\/src\" \"@\"
fi
