#!/bin/bash

cd ../fpm-data-analysis
docker build . -t fpm-data-api
cd ../fpm-docker

docker-compose -f ./docker-compose.yml -p fpm-project stop
docker-compose -f ./docker-compose.yml -p fpm-project down
docker-compose -f ./docker-compose.yml -p fpm-project up -d
