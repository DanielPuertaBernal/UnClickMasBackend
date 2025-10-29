# UnClickMas - Documentación Backend

## Descripción General

Backend de la aplicación UnClickMas desarrollado con Node.js y Express. Proporciona una API RESTful para gestionar usuarios, autenticación y el sistema de puntos del juego.

## Arquitectura del Proyecto

### Estructura de Carpetas

```
backend/
├── src/
│   ├── config/            # Configuración de base de datos
│   ├── controllers/       # Controladores de rutas
│   ├── middleware/        # Middlewares de autenticación
│   ├── models/            # Modelos de datos
│   ├── routes/            # Definición de rutas
│   ├── services/          # Lógica de negocio
│   ├── app.js             # Configuración de Express
│   └── server.js          # Punto de entrada del servidor
├── .env                   # Variables de entorno
├── .gitignore
├── package.json
└── README.md
```

### Patrón de Arquitectura

La aplicación sigue una arquitectura en capas:

1. **Capa de Rutas**: Definición de endpoints y validación inicial
2. **Capa de Controladores**: Manejo de peticiones HTTP y respuestas
3. **Capa de Servicios**: Lógica de negocio y validaciones
4. **Capa de Modelos**: Interacción con la base de datos
5. **Capa de Middleware**: Autenticación y manejo de errores

## Librerías Utilizadas

### Dependencias Principales

#### **Express (v5.1.0)**
- **Propósito**: Framework web para Node.js

#### **PostgreSQL (pg v8.16.3)**
- **Propósito**: Cliente de PostgreSQL para Node.js

#### **bcrypt (v6.0.0)**
- **Propósito**: Encriptación de contraseñas

#### **jsonwebtoken (v9.0.2)**
- **Propósito**: Generación y verificación de tokens JWT

#### **cors (v2.8.5)**
- **Propósito**: Habilitar CORS para peticiones desde el frontend

#### **dotenv (v17.2.3)**
- **Propósito**: Manejo de variables de entorno

#### **morgan (v1.10.1)**
- **Propósito**: Logger de peticiones HTTP

### Dependencias de Desarrollo

#### **nodemon (v3.1.10)**
- **Propósito**: Reinicio automático del servidor en desarrollo

## Configuración

### Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto backend:

```properties
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=unclickmas
JWT_SECRET=tu_clave_secreta_super_segura
JWT_EXPIRATION=24h
```

## Endpoints Principales

### Autenticación

#### **POST /api/users/register**
- Registro de nuevos usuarios
- Valida email y username únicos
- Encripta contraseñas con bcrypt

#### **POST /api/users/login**
- Inicio de sesión con email o username
- Retorna token JWT y datos del usuario

### Juego

#### **PUT /api/users/points**
- Actualiza puntos del usuario (requiere autenticación)
- Valida que los puntos sean números positivos

#### **GET /api/users/leaderboard**
- Obtiene la clasificación global ordenada por puntos

## Instalación y Ejecución

### Paso a Paso

```bash
# 1. Navegar a la carpeta del backend
cd backend

# 2. Configurar variables de entorno
# Crear archivo .env con las variables mencionadas arriba

# 3. Instalar dependencias
npm install

# 4. Iniciar servidor de desarrollo
npm run dev
```

### Base de Datos

Crear la base de datos PostgreSQL con la siguiente estructura:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  totalpoints INTEGER DEFAULT 0
);
```