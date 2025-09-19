from fastapi import FastAPI
from backend.Controller.userController import app as user_app

app = FastAPI()

# Montar las rutas de usuarios
app.include_router(user_app.router)

print("Backend esta ready")

# Ruta de bienvenida en /
@app.get("/")
def root():
	return {"message": "Backend esta ready"}
