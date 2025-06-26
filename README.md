# MiniCore - Sistema de Cálculo de Comisiones

MiniCore es una aplicación web construida con FastAPI (backend) y React + Material UI (frontend), que permite calcular y visualizar automáticamente comisiones por ventas para cada vendedor dentro de un rango de fechas. 
Está diseñada con arquitectura MVC desacoplada, permite integrar fácilmente nuevas reglas de comisión, y puede desplegarse automáticamente en [Render.com](https://render.com) como Web Service (backend) y Static Site (frontend).

Enlace al video explicativo: https://www.loom.com/share/5e7dfe6b9c3d42619c3baaad7ee5cec7?sid=3e60aaf1-dbad-4805-9a5f-dd9ddbd92ae7

## Arquitectura del sistema
### Backend (Python - FastAPI)

- Framework: FastAPI 0.103.0
- Servidor: Uvicorn
- Validación: Pydantic 2.4.0
- Base de Datos: Simulada en memoria (para el alcance del trabajo)

### Frontend (React - JavaScript)

- Framework: React 18
- UI Library: Material-UI (MUI)
- HTTP Client: Axios
- Date Handling: date-fns

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
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

El backend estará disponible en: http://localhost:8000

### 3. Frontend (React)
```bash
cd front-react
npm install
npm start 
```

El frontend estará disponible en: http://localhost:3000

## Despliegue en Render

**Backend - Web Service**

- Tipo: Web Service

- Branch: master

- Root Directory: *`vacío`*

Build Command:
- Ingresa a [Render Dashboard](https://dashboard.render.com/)
- Haz clic en **"New Web Service"**
- Conectar a la cuenta de GitHub y seleccionar el repositorio del proyecto.

### 3. Configura el Servicio

- **Build Command**: *`pip install -r backend/requirements.txt`*
- **Start Command**:  
  ```bash
  python -m uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT
    ```
- **Python Version**: *`3.11.7 (variable de entorno: PYTHON_VERSION)`*

Exposición: [https://minicore-fastapi-react.onrender.com](https://mini-core-comisiones.onrender.com)


**Frontend - Static Site**

- Tipo: Static Site

- Root Directory: *`front-react`*

- **Build Command**:  *`npm ci && npm run build`*
- **Publish Directory**: *`build`*
- **Entorno**: *`REACT_APP_API_URL: https://mini-core-comisiones.onrender.com`*

Exposición: [https://minicore-fastapi-react-1.onrender.com](https://mini-core-comisiones-front.onrender.com)
 
## Uso de la App

Ingresa un rango de fechas en el formulario del frontend.

Al hacer clic en "Calcular Comisiones", se envía una solicitud POST al backend:

El backend consulta todas las ventas que estén dentro del rango y calcula las comisiones de acuerdo a las reglas establecidas en las tablas con datos quemados.

El frontend renderiza la tabla con los resultados.

## 👨 Autor

Joaquin Chacon — 2025

Proyecto académico para prácticas de desarrollo web moderno y despliegue en la nube con Render.
