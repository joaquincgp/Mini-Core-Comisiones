from pydantic import BaseModel
from datetime import date
from typing import Optional


class VentaBase(BaseModel):
    fecha: date
    vendedor_id: int
    monto: float


class VentaCreate(VentaBase):
    pass


class Venta(VentaBase):
    id: int
    vendedor_nombre: str

    class Config:
        from_attributes = True