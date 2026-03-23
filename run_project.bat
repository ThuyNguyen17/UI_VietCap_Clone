@echo off
echo Starting StockVision...

start cmd /k "cd backend && npm start"
start cmd /k "cd front-end && npm start"

echo Both servers are starting up.
echo Frontend: http://localhost:3000
echo Backend: http://localhost:8000
pause
