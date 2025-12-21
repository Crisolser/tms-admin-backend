# --- Base ---
FROM node:22.17.1 AS base
WORKDIR /app
COPY package*.json ./

# --- Local ---
FROM base AS local
RUN npm ci --omit=dev --ignore-scripts
## COPY . . -- Se comenta ya que en local se generará un volumen con el código fuente
EXPOSE 5001
CMD ["npm","run","dev"]

# --- Desarrollo ---
FROM base AS development
RUN npm ci --omit=dev --ignore-scripts
RUN npm install nodemon --no-save
COPY . .
EXPOSE 5001
CMD ["npm","run","dev"]

# --- Producción ---
FROM base AS production
RUN npm ci --only=production --ignore-scripts
COPY . .
EXPOSE 5001
CMD ["npm","start"]