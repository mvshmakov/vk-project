FROM nginx:latest

ADD ./nginx/nginx.dev.conf /etc/nginx/nginx.conf

EXPOSE 80
