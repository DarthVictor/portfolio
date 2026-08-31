#!/usr/bin/env bash
set -Eeuo pipefail

if [ "$(id -u)" -ne 0 ]; then
  echo "Run this script as root." >&2
  exit 1
fi

export DEBIAN_FRONTEND=noninteractive
app_dir=/opt/umami

apt-get update
apt-get install -y ca-certificates curl openssl

install -m 0755 -d /etc/apt/keyrings
if [ ! -f /etc/apt/keyrings/docker.asc ]; then
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
  chmod a+r /etc/apt/keyrings/docker.asc
fi

if [ ! -f /etc/apt/sources.list.d/docker.sources ]; then
  cat >/etc/apt/sources.list.d/docker.sources <<'DOCKER_SOURCES'
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: noble
Components: stable
Architectures: amd64
Signed-By: /etc/apt/keyrings/docker.asc
DOCKER_SOURCES
fi

apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
systemctl enable --now docker

install -d -m 0750 "$app_dir"
if [ ! -s "$app_dir/.env" ]; then
  umami_db_password=$(openssl rand -hex 32)
  umami_app_secret=$(openssl rand -hex 32)
  umask 077
  {
    printf 'POSTGRES_PASSWORD=%s\n' "$umami_db_password"
    printf 'APP_SECRET=%s\n' "$umami_app_secret"
  } >"$app_dir/.env"
fi

cd "$app_dir"
docker compose pull
docker compose up -d
docker compose ps

echo "Umami deployment started in $app_dir."
