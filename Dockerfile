FROM instrumentisto/flutter:3.29.0-androidsdk34-r0

WORKDIR /app

# Set a writable HOME directory
ENV HOME=/app
RUN mkdir -p $HOME/.config/flutter && chmod -R g+w $HOME/.config

# Ensure Flutter directory is writable without assuming a specific user
RUN chmod -R g+w /usr/local/flutter

RUN git config --system --add safe.directory /usr/local/flutter

COPY . .

RUN flutter pub get

EXPOSE 8080

CMD ["flutter", "run", "-d", "web-server", "--web-port", "8080", "--web-hostname", "0.0.0.0"]
