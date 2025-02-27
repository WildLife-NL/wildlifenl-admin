# Use a minimal base image
FROM ubuntu:20.04

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    unzip \
    xz-utils \
    zip \
    libglu1-mesa \
    ca-certificates && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Flutter manually (this ensures the OpenShift user owns the files)
RUN git clone https://github.com/flutter/flutter.git /usr/local/flutter

# Add Flutter to PATH
ENV PATH="/usr/local/flutter/bin:${PATH}"

# Verify Flutter installation
RUN flutter doctor

# Set a writable home directory
ENV HOME=/app
RUN mkdir -p $HOME/.config/flutter

# Redirect Flutter's cache to a writable location in OpenShift
ENV FLUTTER_HOME=/usr/local/flutter
ENV FLUTTER_CACHE=/tmp/flutter_cache
RUN mkdir -p $FLUTTER_CACHE
ENV PUB_CACHE=$FLUTTER_CACHE

# Set Git safe directory
RUN git config --system --add safe.directory /usr/local/flutter

# Copy application files
COPY . .

# Install Flutter dependencies
RUN flutter pub get

# Expose Flutter's web server port
EXPOSE 8080

# Start the application
CMD ["flutter", "run", "-d", "web-server", "--web-port", "8080", "--web-hostname", "0.0.0.0"]
