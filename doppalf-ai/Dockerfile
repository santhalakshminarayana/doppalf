# Why bookworm? https://pythonspeed.com/articles/base-image-python-docker-images/
FROM python:3.12-slim-bookworm as base
WORKDIR /app
RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc
COPY requirements.txt .
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /app/wheels -r requirements.txt

FROM python:3.12-slim-bookworm as build
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY --from=base /app/wheels /app/wheels
COPY --from=base /app/requirements.txt .
RUN pip install --no-cache /app/wheels/*
# RUN pip install --no-cache-dir --upgrade -r requirements.txt
COPY . /app
EXPOSE 4001
CMD ["python", "main.py"]
