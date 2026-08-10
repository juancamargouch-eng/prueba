# Prueba técnica — Mini-sistema de gestión de trámites

## Requisitos previos
- Docker y Docker Compose (recomendado — no requiere instalar Node ni MySQL).
- Alternativa sin Docker: Node.js 20.19.x / npm 10, MySQL 5.7+/MariaDB 10.4+ (probado con Node 22.x y MySQL 8.0).

## Levantar con Docker (recomendado)
1. Clona el repo.
2. Copia `.env.example` a `.env` en la raíz y ajusta `DB_PASS`/`DB_NAME` si quieres.
3. `docker compose up --build`
4. Backend en `http://localhost:4000`, frontend en `http://localhost:5173`.
5. La base de datos, tablas y seed se crean automáticamente al primer arranque.

## Levantar sin Docker

### Base de datos
mysql -u root -p < database/schema.sql
### Backend
cd backend
cp .env.example .env # completa DB_PASS con tu password de MySQL
npm install
npm run dev # puerto 4000

### Frontend
cd frontend
cp .env.example .env
npm install
npm run dev # puerto 5173

## Variables de entorno
**backend/.env**: `PORT`, `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`, `FRONTEND_URL`, `JWT_SECRET`, `AUTH_USER`, `AUTH_PASS`.
**frontend/.env**: `VITE_API_URL` (debe empezar con `VITE_` para que Vite lo exponga al navegador).
**raíz/.env** (solo para Docker Compose): `DB_PASS`, `DB_NAME`.

## Login
Usuario: `operador` / Password: la definida en `AUTH_PASS` del `.env` del backend. No hay tabla de usuarios (no está en el modelo de datos del enunciado); las credenciales son fijas por variable de entorno.

## Endpoints principales
- `POST /api/auth/login`
- `GET|POST /api/clientes`, `GET|PUT /api/clientes/:id`
- `GET|POST /api/tramites`, `GET|PUT|DELETE /api/tramites/:id`, `PATCH /api/tramites/:id/estado`
- `GET /api/tramites/:id/seguimientos`
- Todos los de tramites/clientes requieren header `Authorization: Bearer <token>`.

## Decisiones técnicas y qué quedó fuera
- **Node 22.x** en vez de 20.19.x LTS (lo que tenía instalado); no debería afectar compatibilidad.
- El `CHECK (anio BETWEEN 1990 AND 2027)` del schema.sql se valida en MySQL 8+/MariaDB 10.2+; para 5.7 la validación de rango se refuerza también con Zod en el backend.
- El cliente con `tipo_doc: RUC` (razón social) se guarda en `nombres`/`ap_paterno` porque el modelo de datos del enunciado no tiene un campo separado para razón social.
- `seguimiento` no tiene schema Zod propio: no expone endpoints de escritura directa, sus datos se validan en `tramite.schema.js` porque se genera internamente desde `tramite.service.js`.
- Express 5 captura automáticamente errores de funciones `async` sin necesidad de try/catch manual en cada controller.
- TypeScript en el frontend en modo `strict: false`, priorizando cobertura sobre rigor completo dado el tiempo disponible.
- JWT implementado con credenciales fijas por variable de entorno (sin tabla de usuarios, fuera del alcance del modelo de datos dado).
- Paginación server-side real (limit/offset en la query de Sequelize), no client-side.
- No se implementaron tests automatizados por límite de tiempo; los estructuraría con Vitest sobre `tramite.service.js`, cubriendo transiciones válidas/inválidas de la máquina de estados y el bloqueo de borrado en `INSCRITO`/`CERRADO`.

## Tiempo invertido
- 13 horas 