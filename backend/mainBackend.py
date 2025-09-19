from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.Controller.userController import app as user_app

app = FastAPI()
# Montar las rutas de usuarios
app.include_router(user_app.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


print("Backend esta ready")

# Ruta de bienvenida en /
@app.get("/")
def root():
	return {"message": "Backend esta ready"}
