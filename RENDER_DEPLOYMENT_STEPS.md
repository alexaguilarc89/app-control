# 🚀 Despliegue Completado - Pasos Finales para Render

Tu código ya está en GitHub. Ahora sigue estos pasos para desplegar en Render.

---

## ✅ Estado Actual

- ✅ Código en GitHub: https://github.com/alexaguilarc89/app-control
- ✅ Backend compilado y funcionando localmente
- ✅ Frontend listo en Angular
- ✅ Base de datos conectada a Supabase
- ✅ Dockerfiles configurados
- ⏳ Falta desplegar en Render

---

## 📋 Checklist de Despliegue Render

### Paso 1: Conectar GitHub con Render (⏱️ 2 minutos)

1. **Abre https://dashboard.render.com**
   - Si no tienes cuenta, crea una (puedes usar GitHub)

2. **Ve a Settings → GitHub**
   - Haz clic en **Connect GitHub Account**
   - Se abrirá una ventana de autorización
   - Selecciona el repositorio `alexaguilarc89/app-control`
   - Haz clic en **Install**

✅ **Resultado**: Render tiene acceso a tu repositorio

---

### Paso 2: Desplegar Backend (Java API) (⏱️ 5-10 minutos)

#### 2.1 Crear el servicio
1. En Render Dashboard, haz clic en **New** (esquina superior derecha)
2. Selecciona **Web Service**
3. En "Connect a repository", elige `alexaguilarc89/app-control`
4. Completa el formulario:

| Campo | Valor |
|-------|-------|
| Name | `app-control-backend` |
| Environment | Docker |
| Region | `us-east-1` (o el más cercano) |
| Build Command | (dejar vacío) |
| Start Command | (dejar vacío) |

5. Desplaza hacia abajo y haz clic en **Create Web Service**

Render comenzará a:
- Detectar el Dockerfile en `/backend`
- Compilar el JAR con Maven
- Crear la imagen Docker
- Lanzar el contenedor

⏳ Esto toma **3-5 minutos**. Verás: *"Your service is live"*

#### 2.2 Configurar Variables de Entorno
Mientras se despliega, ve a la pestaña **Environment** del servicio:

Haz clic en **Add Environment Variable** y añade:

```
SPRING_DATASOURCE_URL = jdbc:postgresql://db.hhprnfycfjqjsstkukit.supabase.co:5432/postgres
SPRING_DATASOURCE_USERNAME = postgres
SPRING_DATASOURCE_PASSWORD = sSWKGfWI73eebFAo
SPRING_JPA_HIBERNATE_DDL_AUTO = none
```

⚠️ **Importante**: Después de añadir variables, Render redeploy automáticamente. Espera a que el servicio esté online nuevamente.

✅ **Resultado**: Backend en vivo en `https://app-control-backend.onrender.com`
   - Prueba: https://app-control-backend.onrender.com/api/sectoristas

---

### Paso 3: Desplegar Frontend (Angular App) (⏱️ 5-10 minutos)

#### 3.1 Crear el servicio
1. En Render Dashboard, **New** → **Web Service**
2. Conecta el mismo repositorio `alexaguilarc89/app-control`
3. Completa:

| Campo | Valor |
|-------|-------|
| Name | `app-control-frontend` |
| Environment | Docker |
| Region | **Mismo que el backend** (ej: `us-east-1`) |
| Build Command | (dejar vacío) |
| Start Command | (dejar vacío) |

4. Haz clic en **Create Web Service**

#### 3.2 Actualizar URL del Backend en el Código

Abre el archivo `app-login/src/app/services/api.service.ts` y actualiza:

**Antes:**
```typescript
private apiUrl = 'http://localhost:8080/api';
```

**Después:**
```typescript
private apiUrl = 'https://app-control-backend.onrender.com/api';
```

Guarda, haz commit y push:

```bash
cd d:\ALEX\PROYECTOS\IA
git add app-login/src/app/services/api.service.ts
git commit -m "Update backend URL for Render deployment"
git push
```

Render detectará el cambio y redeploy automáticamente.

#### 3.3 Esperar a que esté Online

El frontend estará listo en: **`https://app-control-frontend.onrender.com`**

✅ **Resultado**: Aplicación en vivo en internet

---

## 🧪 Verificar Despliegue

### Test 1: Backend API
Abre en el navegador:
```
https://app-control-backend.onrender.com/api/sectoristas
```

Deberías ver un JSON vacío `[]` o con datos si ya registraste sectoristas.

### Test 2: Frontend
Abre:
```
https://app-control-frontend.onrender.com
```

Verifica:
1. ¿Carga la aplicación?
2. ¿Aparecen los botones (Registro, Dashboard, etc.)?
3. ¿Puedes registrar un nuevo sectorista?
4. ¿Se guardan los datos en la BD?

### Test 3: Logs
Si algo falla, ve a cada servicio en Render → **Logs** para ver errores:
- **Backend**: Ver si la conexión a Supabase es exitosa
- **Frontend**: Ver si hay errores de CORS o carga

---

## 📱 Resultado Final

| Recurso | URL |
|---------|-----|
| 🌐 Frontend | https://app-control-frontend.onrender.com |
| 🔌 Backend API | https://app-control-backend.onrender.com/api |
| 🗄️ Base de Datos | Supabase (db.hhprnfycfjqjsstkukit.supabase.co) |
| 📦 Repositorio | https://github.com/alexaguilarc89/app-control |

---

## ⚠️ Notas Importantes

### Despliegues Automáticos
- Cada vez que hagas `git push` a `main`, Render automáticamente redeploy
- Los cambios tardán 2-5 minutos en estar en vivo

### Logs y Monitoreo
- Ve a cada servicio → **Logs** para troubleshooting
- Ve a **Metrics** para ver CPU, memoria, etc.

### Plan Gratuito de Render
- Los servicios "duermen" después de 15 minutos sin actividad
- Se despiertan cuando reciben una solicitud (tarda ~30 segundos)
- Para producción, considera el plan pagado

### Dominio Personalizado (Opcional)
Si tienes un dominio:
1. Ve a servicio → **Settings** → **Custom Domain**
2. Apunta tu dominio DNS a Render
3. Render configurará SSL automáticamente

---

## 🆘 Troubleshooting

### ❌ "502 Bad Gateway" en Frontend
- Verifica que la URL del backend sea correcta en `api.service.ts`
- Revisa que el backend esté online en Render
- Abre DevTools (F12) → Network → verifica la petición al API

### ❌ "Connection refused" a Supabase
- Verifica las credenciales en las variables de entorno
- Confirma que Supabase está online
- Revisa los logs del backend

### ❌ "CORS error" en Frontend
- Verifica que `SecurityConfig.java` permite `localhost:4200` y `*.onrender.com`
- Haz un nuevo push para que Render redeploy
- Limpia cache del navegador (Ctrl+Shift+Delete)

### ❌ "Build fails" en Render
- Abre los Logs del servicio para ver el error exacto
- Si es error de Java: Verifica `pom.xml` y `Dockerfile`
- Si es error de Node: Verifica `package.json` y `Dockerfile` del frontend

---

## 📞 Soporte

Si necesitas ayuda:
1. Revisa los **Logs** en Render (cada servicio)
2. Verifica que todas las variables de entorno estén configuradas
3. Prueba los endpoints directamente con `curl` o Postman

**¡Tu aplicación estará lista para producción! 🎉**
