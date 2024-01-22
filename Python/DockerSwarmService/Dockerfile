# syntax=docker/dockerfile:1
FROM python:3.9-alpine
ADD . /code
WORKDIR /code
# Install python deps
COPY requirements/requirements.txt ./code
RUN pip install -r requirements/requirements.txt
CMD ["python", "service.py"]