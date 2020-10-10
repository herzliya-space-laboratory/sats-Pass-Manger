#!/bin/sh


PORT=3000
npx serve ./frontend/__sapper__/export & (cd ./backend && npm run dev)