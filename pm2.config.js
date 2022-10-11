module.exports = {
  apps: [
    {
      name: 'node-api',
      script: 'dist/nestjs/main.js',
      instances: 'max',
      exec_mode: 'cluster',
      watch: false,
      max_memory_restart: '1G',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
