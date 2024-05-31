@echo off
setlocal

:start_backend
echo Starting backend...
cd backend
start "Backend" cmd /k "mvn spring-boot:run"
cd ..

:start_frontend
echo Starting frontend...
cd frontend
call npm install
start "Frontend" cmd /c "npm start"
cd ..

pause

:stop_all
echo Stopping backend and frontend...
taskkill /F /IM "java.exe"
taskkill /F /IM "node.exe"

endlocal
exit /b
