FROM node:latest
WORKDIR /app
COPY ../dist/apps/web /app
RUN npm install
EXPOSE 8000
CMD node main.js
