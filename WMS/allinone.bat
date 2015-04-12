@echo OFF
title Buliding your application
set /p the="%cd%"
%the%
echo ===============================
echo 1. Android
echo 2. Blackberry 10
echo ===============================
SET /P id=Please enter platform no:
IF "%ID%"=="1" GOTO Android


IF "%ID%"=="2" GOTO Blackberry

IF "1"=="1" GOTO :Error

:Blackberry
echo Your choice is blackberry 10 platfrom.
echo Make sure that your Blackberry 10 device is connected...
echo And development mode is on.
call cordova build blackberry10
echo press any key to continue.
pause >nul
cd platforms\blackberry10\cordova
echo Setting device
call target.bat add mydevice 169.254.0.1 -t device --password 1234 --pin 2BCB5B39 
echo Setting Device Complete
echo deploying to device
call run.bat --device --keystorepass bhavesh30
echo deploying complete
echo Press any key to exit....
pause >nul
exit
:Android
echo Your choice is android platfrom.
echo Make sure that your android device is connected...
echo And development mode is on and usb debugging is on
echo press any key to continue.
pause >nul
call cordova build android
echo Building android application complete
cd platforms\android\cordova
call run.bat --device
echo Press any key to exit....
pause >nul
exit
:Error
echo Enter proper choice no
echo Press any key to exit....
pause >nul
exit