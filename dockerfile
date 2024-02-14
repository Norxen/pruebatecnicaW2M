FROM node:21.6.1 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npx ngcc --properties es2024 browser module main --first-only --create-ivy-entry-points
COPY . .
RUN npm run build

FROM nginx:stable
COPY default.conf /etc/nginx/conf.d/
COPY --from=build /app/dist/hero-app/browser/ /usr/share/nginx/html
EXPOSE 80
