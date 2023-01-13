#!/usr/bin/env bash
# exit on error
set -o errexit

yarn
yarn build
yarn typeOrm migration:run -d dist/src/data-source