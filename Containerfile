FROM node:24.15.0-alpine as builder
# pv1prdsat150.sistemas.previred/previred/ocp_docker_images/ubi9_nodejs-24
# FROM pv1prdsat150.sistemas.previred/previred/ocp_docker_images/ubi9_nodejs-24 as builder
 
USER 0
WORKDIR /usr/previpost
#COPY .npmrc ./
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
FROM nginx:alpine
#FROM nexuscloud.previred.com:8081/ubi8/nginx-122
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/previpost/dist /opt/app-root/src
CMD nginx -g "daemon off;"

# Crear una imagen 
#docker build -f Containerfile -t previpost-front .
# Levantar el contenedor
#docker run -p 8091:8080 previpost-front