From nginx:stable-alpine
RUN mkdir -p /run/nginx
WORKDIR /run/nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./includes /etc/nginx/includes/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]