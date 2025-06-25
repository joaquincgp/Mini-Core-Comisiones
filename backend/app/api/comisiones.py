from fastapi import APIRouter, HTTPException
from typing import List
from backend.app.models.comision import ReglaComision, FiltroFechas, ResumenComisiones
from backend.app.services.comision_service import ComisionService
from backend.app.core.database import db

router = APIRouter()


@router.get("/reglas", response_model=List[ReglaComision])
def obtener_reglas_comision():
    """Obtiene todas las reglas de comisión"""
    return db.get_reglas_comision()


@router.post("/calcular", response_model=ResumenComisiones)
def calcular_comisiones(filtro: FiltroFechas):
    """Calcula las comisiones para un rango de fechas"""
    if filtro.fecha_inicio > filtro.fecha_fin:
        raise HTTPException(
            status_code=400,
            detail="La fecha de inicio debe ser menor o igual a la fecha de fin"
        )

    return ComisionService.calcular_comisiones_por_periodo(
        filtro.fecha_inicio,
        filtro.fecha_fin
    )


@router.get("/vendedor/{vendedor_id}")
def obtener_comision_vendedor(vendedor_id: int):
    """Obtiene el porcentaje de comisión que le corresponde a un vendedor según sus ventas totales"""
    ventas = db.get_ventas_by_vendedor(vendedor_id)
    total_ventas = sum(v.monto for v in ventas)
    porcentaje = ComisionService.obtener_porcentaje_comision(total_ventas)

    return {
        "vendedor_id": vendedor_id,
        "total_ventas": total_ventas,
        "porcentaje_comision": porcentaje
    }
