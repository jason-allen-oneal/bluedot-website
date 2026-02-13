# BlueDot Labs (labs.bluedot.it.com)

This folder scaffolds **Option B** for demos:

- `labs.bluedot.it.com` is a reverse-proxy “front door”
- each demo runs as its **own container**
- the proxy routes `/<demo>/` → that demo’s container

## Layout

- `docker-compose.yml` – runs the labs proxy + demo containers
- `nginx/` – Nginx config for the `labs` proxy
- `demos/` – demo service templates
- `scripts/` – helper scripts (scaffold new demo)

## Quick start (local)

```bash
cd ops/labs
docker compose up --build
# open http://localhost:8080
# demo: http://localhost:8080/hello/
```

## How routing works

- The proxy serves the Labs index at `/`
- Each demo is mounted under a path prefix, e.g. `/hello/`
- Each demo service should:
  - either be **base-path aware** (recommended), OR
  - tolerate being served under a prefix via forwarded headers.

The provided `hello` demo is base-path aware.

## Add a new demo

```bash
cd ops/labs
./scripts/new-demo.sh my-demo 3001
# then edit:
# - docker-compose.yml (service name/port)
# - nginx/conf.d/routes.conf (add a location block)
# - demos/my-demo (your app)
```

## Deploying on the VPS

Typical pattern:

1. Run the labs compose stack on the VPS.
2. Point your *host* Nginx vhost `labs.bluedot.it.com` at the labs proxy container (e.g. `127.0.0.1:8080`).

A sample host-level vhost file is in `nginx/host-vhost.example.conf`.
