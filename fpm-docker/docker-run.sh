#!/bin/bash

docker-compose -f ./docker-compose.yml -p fpm-project stop
docker-compose -f ./docker-compose.yml -p fpm-project down
docker-compose -f ./docker-compose.yml -p fpm-project up -d