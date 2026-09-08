#!/usr/bin/env bash
# Bootstrap CookingHub on a fresh Ubuntu light server (Tencent/Aliyun).
# Run ON THE SERVER as root (or with sudo).
#
# What this does:
# - installs Node 20, MongoDB, nginx, pm2
# - creates app user/dir placeholders
# - opens local Mongo only (127.0.0.1)
#
# What YOU still do:
# - upload project code + JSON dumps
# - create .env
# - run import script
# - pm2 start

set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/cookinghub}"
APP_USER="${APP_USER:-ubuntu}"

if [[ "$(id -u)" -ne 0 ]]; then
  echo "Please run as root: sudo bash scripts/server-bootstrap-ubuntu.sh"
  exit 1
fi

export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y curl ca-certificates gnupg ufw nginx git

# Node 20
if ! command -v node >/dev/null 2>&1 || [[ "$(node -v | cut -d. -f1 | tr -d v)" -lt 20 ]]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi

# MongoDB 8.x (Ubuntu 24.04 noble has no official 7.0 repo)
if ! command -v mongod >/dev/null 2>&1; then
  rm -f /etc/apt/sources.list.d/mongodb-org-7.0.list
  curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg --dearmor
  . /etc/os-release
  # noble has 8.0; fall back to jammy packages if needed
  MONGO_CODENAME="${VERSION_CODENAME}"
  if [[ "$MONGO_CODENAME" == "noble" ]]; then
    MONGO_CODENAME="noble"
  fi
  echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu ${MONGO_CODENAME}/mongodb-org/8.0 multiverse" \
    > /etc/apt/sources.list.d/mongodb-org-8.0.list
  apt-get update -y
  apt-get install -y mongodb-org mongodb-database-tools || apt-get install -y mongodb-org
fi

systemctl enable mongod
systemctl start mongod

# Bind Mongo to localhost only if config exists
if [[ -f /etc/mongod.conf ]]; then
  if grep -q "bindIp:" /etc/mongod.conf; then
    sed -i 's/bindIp:.*/bindIp: 127.0.0.1/' /etc/mongod.conf
  fi
  systemctl restart mongod
fi

npm install -g pm2

mkdir -p "$APP_DIR"
chown -R "$APP_USER:$APP_USER" "$APP_DIR" || true

# nginx reverse proxy template
cat > /etc/nginx/sites-available/cookinghub <<EOF
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    client_max_body_size 20m;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

ln -sfn /etc/nginx/sites-available/cookinghub /etc/nginx/sites-enabled/cookinghub
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl enable nginx
systemctl restart nginx

ufw allow OpenSSH || true
ufw allow 80/tcp || true
ufw allow 443/tcp || true
ufw --force enable || true

echo
echo "Bootstrap done."
echo "Next (as $APP_USER):"
echo "  1) upload project into $APP_DIR"
echo "  2) cd $APP_DIR && npm install --omit=dev"
echo "  3) create .env with MONGO_URI=mongodb://127.0.0.1:27017/recipeapp"
echo "  4) import JSON dumps"
echo "  5) pm2 start app.js --name cookinghub && pm2 save && pm2 startup"
echo
node -v
mongod --version | head -1
