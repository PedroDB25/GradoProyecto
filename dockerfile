FROM python:3.11

COPY requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /tmp/requirements.txt

COPY ./ /app

CMD ["uvicorn", "app.app:app", "--host", "0.0.0.0", "--port", "80"]