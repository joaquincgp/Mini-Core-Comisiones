from typing import List
from datetime import date
from backend.app.models.usuario import Usuario
from backend.app.models.venta import Venta
from backend.app.models.comision import ReglaComision


# Simulando base de datos en memorias
class DatabaseManager:
    def __init__(self):
        self._usuarios = [
            Usuario(id=1, nombre="Perico P"),
            Usuario(id=2, nombre="Zoila B"),
            Usuario(id=3, nombre="Aquiles C"),
            Usuario(id=4, nombre="Johny M")
        ]

        self._ventas = [
            Venta(id=1, fecha=date(2025, 5, 21), vendedor_id=1, vendedor_nombre="Perico P", monto=400.00),
            Venta(id=2, fecha=date(2025, 5, 29), vendedor_id=2, vendedor_nombre="Zoila B", monto=600.00),
            Venta(id=3, fecha=date(2025, 6, 3), vendedor_id=2, vendedor_nombre="Zoila B", monto=200.00),
            Venta(id=4, fecha=date(2025, 6, 9), vendedor_id=1, vendedor_nombre="Perico P", monto=300.00),
            Venta(id=5, fecha=date(2025, 6, 11), vendedor_id=3, vendedor_nombre="Aquiles C", monto=900.00),
            Venta(id=6, fecha=date(2025, 6, 14), vendedor_id=1, vendedor_nombre="Perico P", monto=500.00),
            Venta(id=7, fecha=date(2025, 6, 20), vendedor_id=4, vendedor_nombre="Johny M", monto=750.00),
            Venta(id=8, fecha=date(2025, 6, 22), vendedor_id=2, vendedor_nombre="Zoila B", monto=450.00),
            Venta(id=9, fecha=date(2025, 6, 25), vendedor_id=3, vendedor_nombre="Aquiles C", monto=320.00),
            Venta(id=10, fecha=date(2025, 6, 28), vendedor_id=4, vendedor_nombre="Johny M", monto=180.00),
        ]

        self._reglas_comision = [
            ReglaComision(id=1, monto_minimo=1000.0, porcentaje=0.15),
            ReglaComision(id=2, monto_minimo=800.0, porcentaje=0.10),
            ReglaComision(id=3, monto_minimo=600.0, porcentaje=0.08),
            ReglaComision(id=4, monto_minimo=500.0, porcentaje=0.06),
        ]

    def get_usuarios(self) -> List[Usuario]:
        return self._usuarios

    def get_usuario_by_id(self, usuario_id: int) -> Usuario:
        return next((u for u in self._usuarios if u.id == usuario_id), None)

    def get_ventas(self) -> List[Venta]:
        return self._ventas

    def get_ventas_by_periodo(self, fecha_inicio: date, fecha_fin: date) -> List[Venta]:
        return [v for v in self._ventas if fecha_inicio <= v.fecha <= fecha_fin]

    def get_ventas_by_vendedor(self, vendedor_id: int) -> List[Venta]:
        return [v for v in self._ventas if v.vendedor_id == vendedor_id]

    def get_reglas_comision(self) -> List[ReglaComision]:
        return sorted(self._reglas_comision, key=lambda x: x.monto_minimo, reverse=True)


# Instancia global
db = DatabaseManager()