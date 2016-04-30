FROM ubuntu:latest
MAINTAINER Blair Garrett <blair.garrett1@gmail.com>
RUN apt-get update && apt-get -y install curl nginx nano
RUN apt-get -y install supervisor
RUN curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
RUN apt-get install -y git nodejs
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
