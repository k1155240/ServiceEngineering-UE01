cd "C:\Users\wolfsst\Documents\Uni\SE KV\new"
"C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe" --directoryperdb --dbpath "%cd%\src\server\db\data\db" -logpath "%cd%\src\server\db\log\mongo.log" --logappend --rest --install
pause