# =========================
# BUILD STAGE
# =========================
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build -- --configuration production


# =========================
# SERVE STAGE (NGINX)
# =========================
FROM nginx:alpine

# ⚠️ IMPORTANT: your project name = e-commerce
COPY --from=build /app/dist/e-commerce /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]