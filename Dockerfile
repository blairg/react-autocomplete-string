FROM node:latest
MAINTAINER Blair Garrett <blair.garrett1@gmail.com>
EXPOSE 80

RUN apt-get update
RUN apt-get -y install nginx nano git
RUN apt-get -y install supervisor
WORKDIR /opt
RUN git clone https://github.com/blairg/react-autocomplete-string.git
WORKDIR /opt/react-autocomplete-string
RUN npm install gulp -g
RUN npm install gulp-less envify --save-dev
RUN npm install
RUN gulp build
RUN rm -f /etc/nginx/sites-enabled/default
COPY nginxconf /etc/nginx/sites-enabled/nginxconf
COPY nginx.conf /etc/supervisor/conf.d/nginx.conf
CMD ["/usr/bin/supervisord"]
