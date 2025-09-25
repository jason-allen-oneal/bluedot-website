// ecosystem.config.js
module.exports = {
    apps: [
      {
        name: "bluedot",
        cwd: "/var/www/bluedot",
        script: "npm",
        args: "start -- -p 3301", // next dev
        env: { NODE_ENV: "production" },
  
        // You *don’t* need PM2 watch here—Next does it.
        watch: false,
      },
    ],
  };
  