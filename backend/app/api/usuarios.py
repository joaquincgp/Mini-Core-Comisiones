from fastapi import APIRouter, HTTPException
from typing import List
from app.models.usuario import Usuario
from app.schemas.responses import ApiResponse
from app.core.database import db

router = APIRouter()

@router.get("/", response_model=List[Usuario])
def obtener_usuarios():
    """Obtiene todos los usuarios/vendedores"""
    return db.get_usuarios()

@router.get("/{usuario_id}", response_model=Usuario)
def obtener_usuario(usuario_id: int):
    """Obtiene un usuario específico por ID"""
    usuario = db.get_usuario_by_id(usuario_id)
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario