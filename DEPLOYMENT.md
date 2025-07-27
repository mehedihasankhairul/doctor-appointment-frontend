# Deployment Guide for Dr. Ganesh Eye Appointment System

## Overview
This guide covers deploying the eye appointment system with support for:
- Main domain: `https://drganeshcs.com`
- Portal subdomain: `https://portal.drganeshcs.com`

## 1. Domain and DNS Configuration

### DNS Records Required
Add these DNS records in your domain registrar/DNS provider:

```
Type    Name      Value                TTL
A       @         YOUR_SERVER_IP       300
A       www       YOUR_SERVER_IP       300
A       portal    YOUR_SERVER_IP       300
CNAME   www       drganeshcs.com       300
```

### Verify DNS Propagation
```bash
# Check main domain
nslookup drganeshcs.com

# Check subdomain
nslookup portal.drganeshcs.com

# Check from different locations
dig drganeshcs.com @8.8.8.8
dig portal.drganeshcs.com @8.8.8.8
```

## 2. Server Setup (Ubuntu/Debian)

### Install Required Software
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Nginx
sudo apt install nginx -y

# Install Certbot for SSL
sudo apt install certbot python3-certbot-nginx -y

# Install PM2 for process management
sudo npm install -g pm2
```

### Upload Your Project
```bash
# Upload your project to server (example path)
scp -r /Users/mehedihasankhairul/Desktop/eye-appointment user@YOUR_SERVER_IP:/var/www/

# Or clone from git if you have a repository
git clone YOUR_REPOSITORY_URL /var/www/eye-appointment
```

## 3. SSL Certificate Setup

### Option A: Using Certbot (Recommended)
```bash
# Stop nginx temporarily
sudo systemctl stop nginx

# Get SSL certificates for both domains
sudo certbot certonly --standalone -d drganeshcs.com -d www.drganeshcs.com -d portal.drganeshcs.com

# Start nginx
sudo systemctl start nginx
```

### Option B: Using Certbot with Nginx
```bash
# Get certificates and auto-configure nginx
sudo certbot --nginx -d drganeshcs.com -d www.drganeshcs.com -d portal.drganeshcs.com
```

### Auto-renewal Setup
```bash
# Test auto-renewal
sudo certbot renew --dry-run

# Add to crontab for automatic renewal
sudo crontab -e
# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

## 4. Nginx Configuration

Create nginx configuration file:

```bash
sudo nano /etc/nginx/sites-available/drganeshcs
```

Add this configuration:

```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name drganeshcs.com www.drganeshcs.com portal.drganeshcs.com;
    return 301 https://$server_name$request_uri;
}

# Main domain (React app)
server {
    listen 443 ssl http2;
    server_name drganeshcs.com www.drganeshcs.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/drganeshcs.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/drganeshcs.com/privkey.pem;
    
    # SSL Security Headers
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";

    # Document root for React build
    root /var/www/eye-appointment/dist;
    index index.html;

    # Handle React Router
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy to backend
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# Portal subdomain (same React app, different routing)
server {
    listen 443 ssl http2;
    server_name portal.drganeshcs.com;

    # SSL Configuration (same certificates)
    ssl_certificate /etc/letsencrypt/live/drganeshcs.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/drganeshcs.com/privkey.pem;
    
    # SSL Security Headers (same as above)
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";

    # Document root (same React build)
    root /var/www/eye-appointment/dist;
    index index.html;

    # Handle React Router for portal
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy to backend
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/drganeshcs /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 5. Application Deployment

### Build Frontend
```bash
cd /var/www/eye-appointment
npm install
npm run build
```

### Setup Backend
```bash
cd /var/www/eye-appointment/server
npm install

# Update .env for production
nano .env
```

Update `.env` for production:
```env
NODE_ENV=production
PORT=3001
CLIENT_URL=https://drganeshcs.com
MAIN_DOMAIN=https://drganeshcs.com
PORTAL_DOMAIN=https://portal.drganeshcs.com

# Your MongoDB and other configs...
```

### Start Backend with PM2
```bash
cd /var/www/eye-appointment/server

# Start the application
pm2 start server.js --name "eye-appointment-api"

# Save PM2 configuration
pm2 save

# Setup auto-start on boot
pm2 startup
# Follow the generated command

# Monitor logs
pm2 logs eye-appointment-api
```

## 6. Testing Deployment

### Test SSL Certificates
```bash
# Test SSL setup
curl -I https://drganeshcs.com
curl -I https://portal.drganeshcs.com

# Check SSL rating
# Visit: https://www.ssllabs.com/ssltest/
```

### Test API Endpoints
```bash
# Test health endpoint
curl https://drganeshcs.com/api/health
curl https://portal.drganeshcs.com/api/health

# Test CORS
curl -H "Origin: https://portal.drganeshcs.com" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     https://drganeshcs.com/api/health
```

## 7. Monitoring and Maintenance

### PM2 Commands
```bash
# View running processes
pm2 list

# Restart application
pm2 restart eye-appointment-api

# View logs
pm2 logs eye-appointment-api

# Monitor resources
pm2 monit
```

### Nginx Commands
```bash
# Test configuration
sudo nginx -t

# Reload configuration
sudo systemctl reload nginx

# Check status
sudo systemctl status nginx

# View logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### SSL Certificate Renewal
```bash
# Check certificate expiry
sudo certbot certificates

# Manual renewal (if needed)
sudo certbot renew

# Test renewal process
sudo certbot renew --dry-run
```

## 8. Security Considerations

1. **Firewall Configuration**:
```bash
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

2. **Regular Updates**:
```bash
# Update system packages
sudo apt update && sudo apt upgrade

# Update Node.js packages
npm audit fix
```

3. **Backup Strategy**:
- Database backups (MongoDB Atlas handles this if using cloud)
- Application code (use Git)
- SSL certificates (automatically handled by Certbot)

## 9. Troubleshooting

### Common Issues:

1. **CORS Errors**: Check CORS configuration in server.js
2. **SSL Issues**: Verify DNS propagation and certificate paths
3. **API Not Working**: Check PM2 logs and nginx error logs
4. **Subdomain Not Loading**: Verify DNS A record for portal subdomain

### Useful Commands:
```bash
# Check if domain resolves to your server
dig drganeshcs.com
dig portal.drganeshcs.com

# Test connectivity
telnet drganeshcs.com 443
telnet portal.drganeshcs.com 443

# Check certificate details
openssl s_client -connect drganeshcs.com:443 -servername drganeshcs.com
```

## Support

For issues with deployment, check:
1. PM2 logs: `pm2 logs eye-appointment-api`
2. Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. System logs: `sudo journalctl -u nginx`
