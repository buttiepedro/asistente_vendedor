
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
# Dar permisos de ejecución al script de inicio
RUN chmod +x entrypoint.sh

CMD ["python", "main.py"]
