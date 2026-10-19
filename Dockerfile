# Multi-stage Dockerfile

# Stage 1: Dependencies
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Backend (dev)
FROM node:22-alpine AS backend-dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]

# Stage 3: Backend (production)
FROM node:22-alpine AS backend-prod
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]

# Stage 4: Frontend (build)
FROM node:22-alpine AS frontend-build
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

# Stage 5: Frontend (production)
FROM nginx:alpine AS frontend-prod
COPY --from=frontend-build /app/dist /usr/share/nginx/html
COPY src/frontend/public/nginx.conf /etc/nginx/conf.d/default.conf

# Stage 6: Frontend (dev)
FROM node:22-alpine AS frontend-dev
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
EXPOSE 8080
CMD ["npm", "run", "dev:frontend"]