from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.api import usuarios, ventas, comisiones
import uvicorn
import os

app = FastAPI(
    title="Sistema de Comisiones API",
    description="API para calcular comisiones de ventas",
    version="1.0.0"
)

# CORS para permitir conexiones desde cualquier dominio (importante para Render)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, cambiar por dominios específicos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Incluir rutas
app.include_router(usuarios.router, prefix="/api/v1/usuarios", tags=["usuarios"])
app.include_router(ventas.router, prefix="/api/v1/ventas", tags=["ventas"])
app.include_router(comisiones.router, prefix="/api/v1/comisiones", tags=["comisiones"])

@app.get("/")
def read_root():
    return {"message": "Sistema de Comisiones API v1.0"}

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "API funcionando correctamente"}