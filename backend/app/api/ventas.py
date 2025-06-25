from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from datetime import date
from backend.app.models.venta import Venta
from backend.app.core.database import db

router = APIRouter()


@router.get("/", response_model=List[Venta])
def obtener_ventas(
        vendedor_id: Optional[int] = Query(None, description="Filtrar por vendedor"),
        fecha_inicio: Optional[date] = Query(None, description="Fecha de inicio"),
        fecha_fin: Optional[date] = Query(None, description="Fecha de fin")
):
    """Obtiene todas las ventas con filtros opcionales"""
    ventas = db.get_ventas()

    # Aplicar filtros
    if vendedor_id:
        ventas = [v for v in ventas if v.vendedor_id == vendedor_id]

    if fecha_inicio and fecha_fin:
        if fecha_inicio > fecha_fin:
            raise HTTPException(status_code=400, detail="La fecha de inicio debe ser menor o igual a la fecha de fin")
        ventas = [v for v in ventas if fecha_inicio <= v.fecha <= fecha_fin]

    return ventas


@router.get("/vendedor/{vendedor_id}", response_model=List[Venta])
def obtener_ventas_por_vendedor(vendedor_id: int):
    """Obtiene todas las ventas de un vendedor específico"""
    return db.get_ventas_by_vendedor(vendedor_id)