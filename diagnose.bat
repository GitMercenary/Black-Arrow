@echo off
echo USERPROFILE=%USERPROFILE% > env_debug.txt
echo HOMEDRIVE=%HOMEDRIVE% >> env_debug.txt
echo HOMEPATH=%HOMEPATH% >> env_debug.txt
echo USERNAME=%USERNAME% >> env_debug.txt
echo APPDATA=%APPDATA% >> env_debug.txt
set >> env_full.txt
