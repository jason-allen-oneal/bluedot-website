#!/bin/bash
set -e

APP_DIR="/var/www/bluedot"
REPO_DIR="$APP_DIR/repo"

# If repo doesn’t exist, clone it
if [ ! -d "$REPO_DIR/.git" ]; then
    git clone https://github.com/jason-allen-oneal/bluedot-website.git "$REPO_DIR"
fi

cd "$REPO_DIR"
git fetch --all
git reset --hard origin/main

# Optional: build, install deps, restart services
npm install --production || true
npm run build || true

sudo pm2 restart bluedot || true

echo "Deployment complete."
