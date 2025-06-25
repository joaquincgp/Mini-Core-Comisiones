from pydantic import BaseModel
from datetime import date
from typing import List

class ReglaComision(BaseModel):
    id: int
    monto_minimo: float
    porcentaje: float

class FiltroFechas(BaseModel):
    fecha_inicio: date
    fecha_fin: date

class ComisionVendedor(BaseModel):
    vendedor_id: int
    vendedor_nombre: str
    total_ventas: float
    porcentaje_comision: float
    total_comision: float

class ResumenComisiones(BaseModel):
    periodo: str
    comisiones: List[ComisionVendedor]
    total_comisiones: float
    total_ventas: float