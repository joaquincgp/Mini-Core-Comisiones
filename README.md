# MiniCore - Sistema de Cálculo de Comisiones

MiniCore es una aplicación web construida con FastAPI (backend) y React + Material UI (frontend), que permite calcular y visualizar automáticamente comisiones por ventas para cada vendedor dentro de un rango de fechas. 
Está diseñada con arquitectura MVC desacoplada, permite integrar fácilmente nuevas reglas de comisión, y puede desplegarse automáticamente en [Render.com](https://render.com) como Web Service (backend) y Static Site (frontend).

## Arquitectura del sistema
- Backend (Python - FastAPI)

Framework: FastAPI 0.103.0
Servidor: Uvicorn
Validación: Pydantic 2.4.0
Base de Datos: Simulada en memoria (para el alcance del trabajo)

- Frontend (React - JavaScript)

Framework: React 18
UI Library: Material-UI (MUI)
HTTP Client: Axios
Date Handling: date-fns

```bash
miniCoreComisiones/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                 # Punto de entrada FastAPI
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   ├── comisiones.py       # Endpoints de comisiones
│   │   │   ├── usuarios.py         # Endpoints de vendedores
│   │   │   └── ventas.py           # Endpoints de ventas
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   └── database.py         # Simulación de base de datos
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── usuario.py          # Modelo de vendedor
│   │   │   ├── venta.py            # Modelo de venta
│   │   │   └── comision.py         # Modelos de comisión
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   └── responses.py        # Esquemas de respuesta
│   │   └── services/
│   │       ├── __init__.py
│   │       └── comision_service.py # Lógica de negocio
│   └── requirements.txt
└── front-react/
    ├── public/
    │   ├── index.html
    │   └── _redirects            # Para routing en Render
    ├── src/
    │   ├── App.js               # Componente principal
    │   ├── index.js             # Punto de entrada
    │   ├── theme.js             # Configuración de Material-UI
    │   ├── components/
    │   │   ├── FiltroFechas.jsx
    │   │   ├── Layout.jsx
    │   │   ├── TablaComisiones.jsx
    │   │   └── TarjetasInformativas.jsx
    │   ├── pages/
    │   │   ├── Home.jsx         # Dashboard principal
    │   │   ├── Usuarios.jsx     # Gestión de vendedores
    │   │   └── Ventas.jsx       # Listado de ventas
    │   └── services/
    │       └── api.js           # Configuración de Axios
    └── package.json         
```


### 1. Clonar el repositorio de GitHub
Importar el proyecto al IDE de preferencia del [repositorio](https://github.com/joaquincgp/Mini-Core-Comisiones.git)

### 2. Backend (FastAPI)
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # o .venv\Scripts\activate en Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

Esto crea la base de datos MiniCore.db y ejecuta automáticamente el archivo data.sql al levantar el servidor.

### 3. Frontend (React)
```bash
cd frontend
npm install
npm start 

```
## Despliegue en Render

**Backend - Web Service**

- Tipo: Web Service

- Branch: master

- Root Directory: *`backend`*

Build Command:
- Ingresa a [Render Dashboard](https://dashboard.render.com/)
- Haz clic en **"New Web Service"**
- Conectar a la cuenta de GitHub y seleccionar el repositorio del proyecto.

### 3. Configura el Servicio

- **Build Command**: *`pip install -r requirements.txt`*
- **Start Command**:  
  ```bash
  uvicorn main:app --host 0.0.0.0 --port 8000
    ```

Exposición: https://minicore-fastapi-react.onrender.com


**Frontend - Static Site**

- Tipo: Static Site

- Root Directory: *`frontend`*

- **Build Command**:  *`npm install && npm run build`*
- **Publish Directory**: *`build`*

Exposición: https://minicore-fastapi-react-1.onrender.com
 
## Uso de la App

Ingresa un rango de fechas en el formulario del frontend.

Al hacer clic en "Filtrar", se envía una solicitud POST al backend:

`POST /api/filter-inprogress-tasks*npm install && npm run build`

El backend consulta todas las tareas con estado "In progress" que estén dentro del rango y calcula días de retraso.

El frontend renderiza la tabla con los resultados.

## 👨 Autor

Joaquin Chacon — 2025

Proyecto académico para prácticas de desarrollo web moderno y despliegue en la nube con Render.
