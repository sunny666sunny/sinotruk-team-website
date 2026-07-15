#!/bin/bash
# ==============================================
# SINOTRUK Website Deployment Script
# Domain: sinotrukteam.com
# Target: Hostinger VPS (Ubuntu/Debian)
# ==============================================

set -e

# --- Configuration ---
SERVER_USER="root"
SERVER_IP="YOUR_VPS_IP"
DOMAIN="sinotrukteam.com"
WEB_ROOT="/var/www/sinotrukteam"
LOCAL_OUT_DIR="./out"

echo "========================================="
echo " SINOTRUK Website Deployment"
echo " Domain: $DOMAIN"
echo "========================================="

# Step 1: Build the static site locally
echo ""
echo "[1/4] Building static site..."
cd "$(dirname "$0")"
npm run build

if [ ! -d "$LOCAL_OUT_DIR" ]; then
    echo "ERROR: Build failed - out/ directory not found"
    exit 1
fi
echo "       Build complete. Files in $LOCAL_OUT_DIR/"

# Step 2: Upload to VPS
echo ""
echo "[2/4] Uploading to $SERVER_IP..."
rsync -avz --delete \
    --exclude='.git' \
    --exclude='node_modules' \
    --exclude='.next' \
    "$LOCAL_OUT_DIR/" \
    "$SERVER_USER@$SERVER_IP:$WEB_ROOT/"

# Step 3: Set permissions
echo ""
echo "[3/4] Setting permissions..."
ssh "$SERVER_USER@$SERVER_IP" "
    chown -R www-data:www-data $WEB_ROOT
    chmod -R 755 $WEB_ROOT
    find $WEB_ROOT -type f -exec chmod 644 {} \;
    chmod 755 $WEB_ROOT/api/contact.php
"

# Step 4: Reload web server
echo ""
echo "[4/4] Reloading web server..."
ssh "$SERVER_USER@$SERVER_IP" "systemctl reload nginx || systemctl reload apache2 || echo 'Please reload web server manually'"

echo ""
echo "========================================="
echo " Deployment Complete!"
echo " Visit: https://$DOMAIN"
echo ""
echo " Next steps:"
echo " 1. Configure Feishu webhook URL in $WEB_ROOT/api/contact.php"
echo " 2. Test contact form at https://$DOMAIN/contact"
echo "========================================="