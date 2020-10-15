:run_server
    cd ./backend
    npm i
    npm run start
    cd ../
    EXIT /B 0


:export_sapper
    cd ./frontend
    npm i
    npm run build
    PORT=3000
    node __sapper__/build
    cd ../
    EXIT /B 0

start run_server
start export_sapper