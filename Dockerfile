FROM php:7.4-fpm-alpine

COPY composer.lock composer.json /var/www/
WORKDIR /var/www

# Install dependencies
RUN apk --update add freetype-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    shadow \
    libzip-dev \
    gettext \
    gettext-dev \
    icu-dev

# Install extensions
RUN docker-php-ext-install pdo_mysql zip gettext intl exif
RUN docker-php-ext-configure gd --enable-gd \
    --with-freetype=/usr/include/ \
    --with-jpeg=/usr/include/
RUN docker-php-ext-install -j$(nproc) gd

RUN apk add autoconf build-base && pecl install xdebug

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Add user for laravel
ARG PUID=1000  
ENV PUID ${PUID}
ARG PGID=1000
ENV PGID ${PGID}
RUN groupadd -g ${PGID} www && \
    useradd -u ${PUID} -g www -m www && \
    usermod -p "*" www -s /bin/sh

# Copy application folder
COPY . /var/www

# Change current user to www
USER www
RUN composer global require "laravel/installer" && composer global require "phpunit/phpunit"
ENV PATH $PATH:/home/laravel/.composer/vendor/bin

