#!/usr/bin/env bash
set -e

windows() { [[ -n "$WINDIR" ]]; }

if windows; then
    cmd <<< "mklink /D .\node_modules\@ ..\src";
    cmd <<< "mklink /D .\node_modules\\$ ..\..\configs";
else
    ln -sfn ../src ./node_modules/@;
    ln -sfn ../../configs ./node_modules/$;
fi
