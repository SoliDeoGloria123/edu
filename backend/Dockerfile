# Usar imagen oficial de Python
FROM python:3.10

# Crear directorio de trabajo
WORKDIR /app


# Copiar solo el contenido de backend al directorio de trabajo
COPY ./ /app

# Instalar dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Exponer el puerto 5000
EXPOSE 5000

# Comando para iniciar el backend
CMD ["uvicorn", "mainBackend:app", "--host", "0.0.0.0", "--port", "5000", "--reload"]

# Con este comando levanta la imagen
# docker build -t backend-image -f backend/dockerfile.backend .

# Con este comando corre la imagen
# docker run -d -p 5000:5000 --name backend-container backend-image

# Comando para detener el contenedor
# docker rm -f backend-container