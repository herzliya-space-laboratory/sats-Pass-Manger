#!/bin/sh


run_server()
{
    cd ./backend
    npm i
    npm run start
    cd ../
}

export_sapper()
{
    cd ./frontend
    npm i
    npm run build
    PORT=3000
    node __sapper__/build
    cd ../
}

run_server & export_sapper