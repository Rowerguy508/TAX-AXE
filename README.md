<div align="center"><a name="readme-top"></a>

<img src="public/logo/512.png" alt="Tax Axe logo" width="280">

# Tax Axe
### Contabilidad con IA, enfocada en equipos hispanohablantes

[![GitHub Stars](https://img.shields.io/github/stars/vas3k/TaxHacker?color=ffcb47&labelColor=black&style=flat-square)](https://github.com/vas3k/TaxHacker/stargazers)
[![License](https://img.shields.io/badge/license-MIT-ffcb47?labelColor=black&style=flat-square)](https://github.com/vas3k/TaxHacker/blob/main/LICENSE)

</div>

Tax Axe es una app de contabilidad self-hosted que usa IA para leer tickets, facturas y comprobantes, convertirlos en transacciones estructuradas y facilitar tu cierre fiscal.

Está pensada para freelancers, agencias, creadores y pequeñas empresas que trabajan en español (España y LATAM), sin renunciar a soporte multimoneda, OCR y flujos automatizados.

![Dashboard](public/landing/main-page.webp)

## ¿Qué puedes hacer con Tax Axe?

- Escanear fotos y PDFs con OCR + LLM.
- Extraer campos clave (fecha, proveedor, importe, impuestos, conceptos).
- Clasificar movimientos por categoría, proyecto y campos personalizados.
- Convertir divisas con tipo de cambio histórico (incluye cripto).
- Exportar datos en CSV/ZIP para gestoría o auditoría.
- Ejecutarlo en tu propio servidor para mantener privacidad y control.

## Enfoque en español

Esta versión del proyecto prioriza:

- UX y textos más naturales en español.
- Mejor legibilidad para flujos reales de facturación y gastos en español.
- Base flexible para añadir presets por país (IVA, retenciones, formatos fiscales, etc.).

## Mercado objetivo (nueva etapa)

Estamos reposicionando Tax Axe para el mercado hispanohablante (LATAM + España), con foco inicial en:

- Operaciones de freelancers y microempresas.
- Flujos reales de recibos/facturas en español.
- Reportes claros para trabajo conjunto con gestoría/contador.

> ⚠️ Importante: Tax Axe no sustituye asesoría fiscal profesional. Úsalo como asistente, no como criterio legal/fiscal definitivo.

## Despliegue rápido (Docker Compose)

```bash
curl -O https://raw.githubusercontent.com/vas3k/TaxHacker/main/docker-compose.yml
docker compose up
```

## Variables de entorno clave

| Variable | Requerida | Descripción |
|---|---|---|
| `UPLOAD_PATH` | Sí | Carpeta local para archivos cargados |
| `DATABASE_URL` | Sí | Conexión PostgreSQL |
| `BETTER_AUTH_SECRET` | Sí | Secreto de auth (mín. 16 chars) |
| `SELF_HOSTED_MODE` | No | Activa modo self-hosted (`true`) |
| `BASE_URL` | No | URL base pública |
| `PORT` | No | Puerto de la app (default `7331`) |

## Desarrollo local

```bash
git clone https://github.com/vas3k/TaxHacker.git
cd TaxHacker
npm install
cp .env.example .env
npx prisma generate && npx prisma migrate dev
npm run dev
```

App local: `http://localhost:7331`

## Stack

- Next.js
- PostgreSQL + Prisma
- OCR/PDF pipeline
- Integración con LLMs (OpenAI, Gemini, Mistral y compatibles)

## Contribuir

- Abre un issue para discutir cambios grandes.
- PRs pequeños, claros y probados.
- Si mejoras copy/UI en español, incluye contexto regional (España/LATAM) cuando aplique.

## Licencia

MIT — ver [LICENSE](./LICENSE).
