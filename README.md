
# EDU Backend & Frontend

## Estructura del proyecto

```
edu/
├── backend/
│   ├── mainBackend.py
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── config/
│   ├── Controller/
│   ├── Models/
│   └── script/
└── frontend/
    ├── src/
    ├── public/
    └── ...
```

## Tecnologías utilizadas

- **FastAPI**: API backend
- **MongoDB Atlas**: Base de datos NoSQL
- **Pydantic**: Validación de datos
- **Uvicorn**: Servidor ASGI
- **Passlib (bcrypt)**: Hash de contraseñas
- **python-dotenv**: Variables de entorno
- **React + Vite**: Frontend moderno

---

## Instalación y ejecución backend

### 1. Clona el repositorio
```bash
git clone https://github.com/SoliDeoGloria123/edu.git
cd edu
```

### 2. Instalación local
```bash
cd backend
pip install -r requirements.txt
```

### 3. Ejecución local
```bash
uvicorn mainBackend:app --reload --port 5000
```

### 4. Ejecución con Docker (logs en vivo)
Desde la raíz del proyecto:
```bash
docker build -t backend-image -f backend/Dockerfile backend
docker run -it --rm -p 5000:5000 --name backend-container backend-image
```
Esto mostrará los logs en tiempo real y el backend estará disponible en `http://localhost:5000`.

---

## Endpoints principales

- `GET /users` — CRUD de usuarios
- `GET /users/stats/total` — Total de usuarios
- `GET /users/stats/active` — Usuarios activos
- `GET /users/stats/inactive` — Usuarios inactivos
- `GET /docs` — Documentación interactiva (Swagger UI)

---

## Poblar la base de datos (Seed)

Ejecuta el script para datos iniciales:
```bash
cd backend
python3 -m script.seed
```

---

## Instalación y ejecución frontend

### 1. Instalación
```bash
cd frontend
npm install
```

### 2. Ejecución
```bash
npm run dev
```
El frontend estará disponible en `http://localhost:5173` y consumirá el backend en el puerto 5000.

---

## Notas importantes

- Los imports internos en el backend usan rutas relativas para compatibilidad con Docker.
- El backend expone CORS para conexión con el frontend.
- Revisa `.env` para configurar credenciales y conexión a MongoDB Atlas.

---

> Para más detalles, consulta la documentación interactiva en `http://localhost:5000/docs`.