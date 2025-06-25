from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.api import usuarios, ventas, comisiones
import uvicorn

app = FastAPI(
    title="Sistema de Comisiones API",
    description="API para calcular comisiones del total de ventas por vendedor",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
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

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)