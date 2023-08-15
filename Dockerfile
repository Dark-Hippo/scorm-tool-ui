# Dockerfile for a simple apache server to serve the scorm-tool-ui

FROM httpd:2.4
COPY ./dist/ /usr/local/apache2/htdocs/
