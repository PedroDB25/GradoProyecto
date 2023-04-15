chmod 775 /root/app/files/ddbb
chmod 775 /root/app/files/ddbb/mx.sqlite

uvicorn app.app:app --host 0.0.0.0 --port 80