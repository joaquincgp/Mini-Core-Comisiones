from typing import List
from datetime import date
from backend.app.models.comision import ComisionVendedor, ResumenComisiones
from backend.app.core.database import db


class ComisionService:
    @staticmethod
    def obtener_porcentaje_comision(total_ventas: float) -> float:
        """Determina el porcentaje de comisión basado en el total de ventas"""
        reglas = db.get_reglas_comision()
        for regla in reglas:
            if total_ventas >= regla.monto_minimo:
                return regla.porcentaje
        return 0.0

    @staticmethod
    def calcular_comisiones_por_periodo(fecha_inicio: date, fecha_fin: date) -> ResumenComisiones:
        """Calcula las comisiones de todos los vendedores en un rango de fechas"""
        # Obtener ventas del período
        ventas_periodo = db.get_ventas_by_periodo(fecha_inicio, fecha_fin)

        # Agrupar ventas por vendedor
        ventas_por_vendedor = {}
        for venta in ventas_periodo:
            if venta.vendedor_id not in ventas_por_vendedor:
                ventas_por_vendedor[venta.vendedor_id] = {
                    'nombre': venta.vendedor_nombre,
                    'total': 0.0,
                    'ventas': []
                }
            ventas_por_vendedor[venta.vendedor_id]['total'] += venta.monto
            ventas_por_vendedor[venta.vendedor_id]['ventas'].append(venta)

        # Calcular comisiones
        comisiones = []
        total_comisiones = 0.0
        total_ventas = 0.0

        for vendedor_id, datos in ventas_por_vendedor.items():
            total_ventas_vendedor = datos['total']
            porcentaje = ComisionService.obtener_porcentaje_comision(total_ventas_vendedor)
            total_comision = total_ventas_vendedor * porcentaje

            comision = ComisionVendedor(
                vendedor_id=vendedor_id,
                vendedor_nombre=datos['nombre'],
                total_ventas=total_ventas_vendedor,
                porcentaje_comision=porcentaje,
                total_comision=total_comision
            )
            comisiones.append(comision)
            total_comisiones += total_comision
            total_ventas += total_ventas_vendedor

        # Ordenar por total de comisión descendente
        comisiones.sort(key=lambda x: x.total_comision, reverse=True)

        periodo_str = f"{fecha_inicio.strftime('%d/%m/%Y')} - {fecha_fin.strftime('%d/%m/%Y')}"

        return ResumenComisiones(
            periodo=periodo_str,
            comisiones=comisiones,
            total_comisiones=total_comisiones,
            total_ventas=total_ventas
        )
