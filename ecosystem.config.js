module.exports = {
  apps: [
    {
      name: "kada-front",
      cwd: "/var/www/kada/frontend/kada-frontend",
      script: "npm",
      args: "run start -- -p 5991",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
