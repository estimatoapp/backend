#!/bin/sh

docker buildx build --platform linux/amd64 -t backend .

docker tag backend:latest us-east1-docker.pkg.dev/estimato-production/backend/backend:latest

docker push us-east1-docker.pkg.dev/estimato-production/backend/backend:latest