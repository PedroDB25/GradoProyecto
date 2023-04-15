FROM python:3.11

COPY requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /tmp/requirements.txt

COPY ./ /app

ENV PYTHONPATH "${PYTHONPATH}:/app"


CMD "chmod 775 /root/app/files/ddbb"
CMD "chmod 775 /root/app/files/ddbb/mx.sqlite"


CMD ["uvicorn", "app.app:app", "--host", "0.0.0.0", "--port", "80"]