# EDU Backend & Frontend
## Descripción del proyecto

Este proyecto es una aplicación educativa que proporciona estadísticas y gestión de usuarios y cursos. El backend está construido con FastAPI y utiliza MongoDB Atlas como base de datos, mientras que el frontend es una aplicación React moderna desarrollada con Vite para visualizar datos de usuarios activos, inactivos y estadísticas relacionadas.


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
## Requisitos previos

- **Python 3.8+** para el backend
- **Node.js 16+** para el frontend
- **Docker** (opcional, para ejecución en contenedor)
- **Cuenta en MongoDB Atlas** para la base de datos

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
## Configuración

### Variables de entorno

Crea un archivo `.env` en la carpeta `backend/` con las siguientes variables:

```env
MONGODB_URL=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/edu
SECRET_KEY=tu_clave_secreta_aqui
```

Asegúrate de configurar tu conexión a MongoDB Atlas y una clave secreta segura.

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

## Desarrollo

### Backend

- El código principal está en `backend/mainBackend.py`.
- Los modelos de datos en `backend/Models/`.
- Controladores en `backend/Controller/`.
- Configuración en `backend/config/`.

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

¡Gracias por contribuir al proyecto EDU!
- El componente principal es `frontend/src/App.jsx`.
- Componentes en `frontend/src/components/`.
- Hooks personalizados en `frontend/src/hooks/`.

Para desarrollo local, ejecuta ambos servicios simultáneamente.

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

> Para más detalles, consulta la documentación interactiva en `http://localhost:5000/docs`.<

> App desplegada: `https://edu-3e3i.onrender.com`<

> Frontend: `https://edu-frontend-ghew.onrender.com`<

> Backend:  `https://edu-backend-cpiy.onrender.com`<