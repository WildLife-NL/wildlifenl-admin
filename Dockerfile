FROM instrumentisto/flutter:3.29.0-androidsdk34-r0

WORKDIR /app

RUN chown -R root:root /usr/local/flutter
RUN git config --global --add safe.directory /usr/local/flutter

COPY . .

RUN flutter pub get

EXPOSE 8080

CMD ["flutter", "run", "-d", "web-server", "--web-port", "8080", "--web-hostname", "0.0.0.0"]