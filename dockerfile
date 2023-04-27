FROM python:3.11

COPY requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /tmp/requirements.txt

COPY ./ /app

ENV PYTHONPATH "${PYTHONPATH}:/app"

RUN ["chmod", "+x", " /app/files/ddbb" , "/app/files/ddbb/mx.sqlite"]
CMD ["uvicorn","app:app","--host","0.0.0.0","--port","80"]
