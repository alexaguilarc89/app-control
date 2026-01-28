# Guía de Despliegue en Render

## Paso 1: Autorización de GitHub en Render

### 1.1 Acceder a Render Dashboard
- Ve a https://dashboard.render.com
- Inicia sesión con tu cuenta de Render (crea una si no tienes)
- En el panel izquierdo, haz clic en **Settings** → **GitHub**

### 1.2 Conectar tu cuenta de GitHub
- Haz clic en **Connect GitHub Account**
- Se abrirá una ventana de GitHub
- Autoriza a Render para acceder a tus repositorios
- Selecciona el repositorio `alexaguilarc89/app-control`
- Haz clic en **Install** para confirmar

## Paso 2: Desplegar el Backend (API Java)

### 2.1 Crear el servicio del Backend
1. En Render Dashboard, haz clic en **New** → **Web Service**
2. Selecciona **Build and deploy from a Git repository**
3. Conecta tu repositorio `alexaguilarc89/app-control`
4. Completa el formulario:

```
Name: app-control-backend
Environment: Docker
Region: (elige el más cercano: us-west, us-east, eu-west)
Branch: main
Build Command: (dejar en blanco - Dockerfile lo maneja)
Start Command: (dejar en blanco)
```

### 2.2 Configurar Variables de Entorno del Backend
En la sección **Environment**, añade estas variables:

```
SPRING_DATASOURCE_URL=jdbc:postgresql://db.hhprnfycfjqjsstkukit.supabase.co:5432/postgres
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=sSWKGfWI73eebFAo
SPRING_JPA_HIBERNATE_DDL_AUTO=none
PORT=8080
```

### 2.3 Configurar Dockerfile
- Ruta: `backend/Dockerfile`
- Puerto: 8080

### 2.4 Crear el Servicio
- Haz clic en **Create Web Service**
- Render iniciará el despliegue automáticamente
- Espera a que veas "Your service is live" (~3-5 minutos)
- Anota la URL que te proporciona (ej: `app-control-backend.onrender.com`)

## Paso 3: Desplegar el Frontend (Aplicación Angular)

### 3.1 Crear el servicio del Frontend
1. En Render Dashboard, haz clic en **New** → **Web Service**
2. Conecta el mismo repositorio `alexaguilarc89/app-control`
3. Completa el formulario:

```
Name: app-control-frontend
Environment: Docker
Region: (mismo que el backend)
Branch: main
Build Command: (dejar en blanco - Dockerfile lo maneja)
Start Command: (dejar en blanco)
```

### 3.2 Configurar Variables de Entorno del Frontend
En la sección **Environment**, añade:

```
BACKEND_URL=https://app-control-backend.onrender.com
NODE_ENV=production
```

### 3.3 Configurar Dockerfile
- Ruta: `app-login/Dockerfile`
- Puerto: 80 (o 3000)

### 3.4 Crear el Servicio
- Haz clic en **Create Web Service**
- Espera a que Render complete el despliegue
- La URL será algo como: `app-control-frontend.onrender.com`

## Paso 4: Actualizar la Configuración del Frontend

En `app-login/src/app/services/api.service.ts`, actualiza la URL del backend:

```typescript
private apiUrl = 'https://app-control-backend.onrender.com/api';
```

Haz commit y push para que Render redeploy automáticamente.

## Paso 5: Verificar el Despliegue

### 5.1 Test del Backend
```bash
curl https://app-control-backend.onrender.com/api/sectoristas
```

### 5.2 Test del Frontend
- Abre en navegador: `https://app-control-frontend.onrender.com`
- Intenta registrar un nuevo sectorista
- Verifica que los datos se guardan en Supabase

## Configuración Adicional (Recomendada)

### Auto-deploy en cada push
Render automáticamente redeploy cuando hagas push a `main`. 

### Monitoreo y Logs
- En cada servicio, haz clic en **Logs** para ver la salida de la aplicación
- En **Metrics** puedes ver CPU, memoria, etc.

### Dominio Personalizado
- Ve a Settings → Custom Domain
- Apunta tu dominio al servicio de Render

## Troubleshooting

### 502 Bad Gateway en Frontend
- Verifica que `BACKEND_URL` esté correcto en las variables de entorno
- Asegúrate de que el backend está online
- Revisa los logs del frontend

### Conexión a BD fallida
- Verifica las credenciales de Supabase
- Confirma que Supabase permite conexiones desde Render (IP whitelist)
- Revisa los logs del backend para ver el error exacto

### Frontend no carga datos
- Abre DevTools (F12) → Network
- Busca las peticiones a `/api/sectoristas`
- Verifica que responden con HTTP 200
- Revisa la consola para errores de CORS

## URLs Finales

Una vez completado el despliegue:

- **Frontend**: `https://app-control-frontend.onrender.com`
- **Backend API**: `https://app-control-backend.onrender.com/api`
- **Base de Datos**: `db.hhprnfycfjqjsstkukit.supabase.co` (Supabase)

---

**Nota**: Los servicios gratuitos de Render pueden dormir después de 15 minutos sin actividad. Para evitar esto, usa el plan pagado o configura un "keep-alive" externo.
