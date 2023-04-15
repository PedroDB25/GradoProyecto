echo "Primer chmod..."
chmod 777 /app/files/ddbb
echo "Segundo chmod..."
chmod 777 /app/files/ddbb/mx.sqlite
echo "Iniciando server..."
uvicorn app:app --host 0.0.0.0 --port 80