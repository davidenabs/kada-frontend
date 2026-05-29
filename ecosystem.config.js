module.exports = {
  apps: [
    {
      name: "kada-front",
      cwd: "/var/www/kada/frontend/kada-frontend",
      script: ".next/standalone/server.js",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 5991
      }
    }
  ]
};
