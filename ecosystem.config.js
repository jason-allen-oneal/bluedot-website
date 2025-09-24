// ecosystem.config.js
module.exports = {
    apps: [
      {
        name: "bluedot",
        cwd: "/var/www/bluedot",
        script: "npm",
        args: "run dev -- -p 3000", // next dev
        env: { NODE_ENV: "development" },
  
        // You *don’t* need PM2 watch here—Next does it.
        watch: false,
      },
    ],
  };
  