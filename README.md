# Ejemplo de webapp con Next.js 13

Ejemplo app con mongoDB, mongoose, next-auth, ssr, csr, swr.

## Primeros pasos

Copiar el archivo .env.example a .env y completar las variables de entorno.

```bash
MONGO=mongodb://127.0.0.1:27017/<databasename> # local

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

NEXTAUTH_SECRET="123456"
NEXTAUTH_URL="http://localhost:3000"
```

## Ejecutar en modo desarrollo

```bash
npm run dev
```

## Ejecutar en modo producción

```bash
npm run build
npm run start
```

