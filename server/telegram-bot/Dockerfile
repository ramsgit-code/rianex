FROM python:3.12-slim
WORKDIR /app
RUN pip install --no-cache-dir psutil docker
COPY bot.py metrics.py /app/
CMD ["python", "-u", "bot.py"]
