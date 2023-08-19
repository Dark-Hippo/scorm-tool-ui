# Build the scorm-tool-ui
FROM node:18 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Copy the build to the apache server
FROM httpd:2.4
COPY --from=build-stage /app/dist/ /usr/local/apache2/htdocs/
COPY --from=build-stage /app/httpd.conf /usr/local/apache2/conf/httpd.conf
EXPOSE 80