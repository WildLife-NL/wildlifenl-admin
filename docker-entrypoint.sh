#!/bin/sh
set -eu

LIVE_API_URL="https://live-api-wildlifenl.uu.nl"
TEST_API_URL="https://test-api-wildlifenl.uu.nl"
REF="${OPENSHIFT_BUILD_REFERENCE:-${SOURCE_REF:-${GIT_BRANCH:-}}}"

case "$REF" in
    refs/heads/*) REF="${REF#refs/heads/}" ;;
esac

URL=""
if [ -n "${REACT_APP_API_URL:-}" ]; then
    URL="$REACT_APP_API_URL"
elif [ "$REF" = "main" ] || [ "$REF" = "master" ]; then
    URL="$LIVE_API_URL"
elif [ -n "$REF" ]; then
    URL="$TEST_API_URL"
fi

if [ -n "$URL" ]; then
    case "$URL" in
        https://*)
            SAFE_URL=$(printf '%s' "$URL" | tr -d '"\\')
            printf 'window.ENV = { API_URL: "%s" };\n' "$SAFE_URL" > /usr/share/nginx/html/env-config.js
            ;;
    esac
fi

exec "$@"
