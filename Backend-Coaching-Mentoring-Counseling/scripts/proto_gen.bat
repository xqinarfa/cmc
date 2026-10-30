@echo off
REM Generate Go code from Protocol Buffers using buf or protoc
echo Generating protobuf files...

where buf >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    buf generate
    goto :done
)

if exist "%USERPROFILE%\go\bin\buf.exe" (
    "%USERPROFILE%\go\bin\buf.exe" generate
    goto :done
)

protoc --go_out=. --go_opt=paths=source_relative ^
       --go-grpc_out=. --go-grpc_opt=paths=source_relative ^
       internal/modules/auth/delivery/grpc/proto/auth/v1/auth.proto

:done
if %ERRORLEVEL% EQU 0 (
    echo Proto files generated successfully!
) else (
    echo Error generating proto files. Make sure buf or protoc is installed and in PATH.
)

