@ECHO OFF
ECHO Welcome to the Server Launching Tool!
ECHO.
ECHO When you're finished, just close this window to shut down the server.
ECHO.

ECHO Server will be created from current directory:
ECHO %cd%
ECHO.

ECHO launching server...
ECHO.

C:\Users\ben1r\AppData\Local\Programs\Python\Python37-32\python.exe -m http.server

ECHO done

PAUSE
