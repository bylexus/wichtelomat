FROM httpd:2.4

RUN apt-get update && apt-get dist-upgrade -y && apt-get install -y \
    gcc \
    g++ \
    make \
    ca-certificates \
    curl

COPY httpd.conf /usr/local/apache2/conf/httpd.conf

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs

WORKDIR /src