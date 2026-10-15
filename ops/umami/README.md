# Self-hosted Umami

This directory contains the reproducible VPS deployment for the portfolio analytics service.

## Architecture

- VPS OS: Ubuntu 24.04 LTS
- Runtime: Docker Engine and Docker Compose plugin
- Analytics: Umami 3.3.1
- Database: PostgreSQL 15 Alpine
- HTTPS/reverse proxy: Caddy
- Public hostname: `analytics.darthvictor.xyz`
- Umami and PostgreSQL are not exposed directly to the internet.

## First deployment

The bootstrap script is intended to run on a fresh Ubuntu 24.04 VPS as `root`:

```bash
scp ops/umami/compose.yaml ops/umami/Caddyfile root@VPS_IP:/opt/umami/
scp ops/umami/bootstrap-ubuntu.sh root@VPS_IP:/opt/umami/
ssh root@VPS_IP 'chmod 700 /opt/umami/bootstrap-ubuntu.sh && /opt/umami/bootstrap-ubuntu.sh'
```

The script installs Docker from Docker's official Ubuntu repository, generates the database password and Umami application secret on the VPS, pulls the pinned image digests, and starts the stack.

Before opening the public hostname, create this Cloudflare DNS record:

```text
Type: A
Name: analytics
Target: VPS public IPv4
```

Cloudflare may proxy the record after the origin is reachable. Caddy obtains and renews the HTTPS certificate automatically.

## Operations

Run these commands from `/opt/umami` on the VPS:

```bash
docker compose ps
docker compose logs --tail=100 umami
docker compose logs --tail=100 caddy
docker compose pull
docker compose up -d
```

The PostgreSQL data is stored in the `umami-db-data` Docker volume. Back up this volume or the database before making major upgrades.

## Proxied sites

A site may serve the tracker from its own origin to avoid analytics blocklists, as ShortlistFox
does for `/_a/script.js` and `/_a/api/send`. It must forward the visitor IP as `X-Visitor-IP`
(`CLIENT_IP_HEADER`); otherwise every visit counts as the proxying server's IP. Location comes
from the IP (`SKIP_LOCATION_HEADERS`) because Cloudflare's country headers would describe that
server too. Apply changes with `docker compose up -d umami`.

## Important security notes

- The real `/opt/umami/.env` must never be committed.
- Change Umami's default `admin` / `umami` password immediately after the first login.
- Enable Umami two-factor authentication after the first login.
- Do not publish port `5432` or Umami's port `3000`.
