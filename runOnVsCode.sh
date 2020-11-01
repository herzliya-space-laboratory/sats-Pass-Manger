#!/bin/sh

xdotool key ctrl+shift+5

sleep 1
xdotool type 'cd ./frontend && npm run dev
'
cd ./backend
npm run dev