from pydantic import BaseModel
from typing import Optional


class UsuarioBase(BaseModel):
    nombre: str


class UsuarioCreate(UsuarioBase):
    pass


class Usuario(UsuarioBase):
    id: int

    class Config:
        from_attributes = True