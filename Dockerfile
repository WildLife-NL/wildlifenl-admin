FROM ubuntu:20.04

WORKDIR /app

RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    curl \
    git \
    unzip \
    xz-utils \
    zip \
    libglu1-mesa \
    ca-certificates \
    cmake \
    ninja-build \
    clang \
    pkg-config && \
    apt-get clean


# Install Flutter manually in a writable location
RUN git clone https://github.com/flutter/flutter.git /opt/flutter

# Add Flutter to PATH
ENV PATH="/opt/flutter/bin:${PATH}"

# Set writable Flutter home
ENV FLUTTER_HOME=/opt/flutter

# Set Git safe directory
RUN git config --system --add safe.directory /opt/flutter

# Copy application files
COPY . .

# Install Flutter dependencies
RUN flutter pub get

EXPOSE 8080

CMD ["flutter", "run", "-d", "web-server", "--web-port", "8080", "--web-hostname", "0.0.0.0"]
