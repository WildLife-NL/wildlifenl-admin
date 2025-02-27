
FROM instrumentisto/flutter:3.29.0-androidsdk34-r0


WORKDIR /app


COPY . .


RUN flutter pub get


EXPOSE 8080


CMD ["flutter", "run", "-d", "web-server", "--web-port", "8080", "--web-hostname", "0.0.0.0"]
