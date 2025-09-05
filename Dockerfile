# Etapa 1: Construcción
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias primero
COPY package.json yarn.lock ./

# Instalar dependencias (incluye devDependencies para compilar)
RUN yarn install

# Copiar el resto del código
COPY . .

# Compilar NestJS a JS
RUN yarn build

# Etapa 2: Ejecución
FROM node:20-alpine

WORKDIR /app

# Copiar solo lo necesario desde la etapa de build
COPY package.json yarn.lock ./
RUN yarn install --production

COPY --from=builder /app/dist ./dist

# Exponer puerto de la app
EXPOSE 2125

# Comando de arranque
CMD ["node", "dist/main.js"]
