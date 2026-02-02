# Stage 1: Build the Angular application
FROM node:22-alpine AS build
WORKDIR /app


COPY package*.json ./
RUN npm install


COPY . .

RUN npm run build -- --configuration=production

FROM nginx:alpine


# Change 'music-stream' to 'MusicStream' to match your folder
COPY --from=build /app/dist/MusicStream/browser /usr/share/nginx/html


COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
