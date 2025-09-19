# EDU Backend

## Tecnologías utilizadas

- **FastAPI**: Framework para construir APIs rápidas y modernas.
- **MongoDB Atlas**: Base de datos NoSQL en la nube.
- **Pydantic**: Validación y serialización de datos.
- **Uvicorn**: Servidor ASGI para aplicaciones Python.
- **Passlib (bcrypt)**: Gestión segura de contraseñas.
- **python-dotenv**: Manejo de variables de entorno.

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/SoliDeoGloria123/edu.git
    cd backend
    ```

2. Instala las dependencias:
    ```bash
    pip install -r requirements.txt
    ```

## Ejecución del servidor

Inicia el servidor de desarrollo con:
```bash
uvicorn backend.mainBackend:app --reload --port 5000
```

## Endpoints principales

- `GET /users`  
  CRUD de usuarios

- `GET /users/stats/total`  
  Total de usuarios

- `GET /users/stats/active`  
  Usuarios activos

- `GET /users/stats/inactive`  
  Usuarios inactivos

- `GET /docs`  
  Documentación interactiva (Swagger UI)

## Poblar la base de datos (Seed)

Ejecuta el script de seed para datos iniciales:
```bash
python3 -m backend.script.seed
```

---

> Para más detalles, consulta la documentación en `http://0.0.0.0:5000/docs`.