const fs = require("fs");
const path = require("path");
require("dotenv").config();
const logRoutes = process.env.LOG_ROUTES === "TRUE";

const registerRoutes = (directory, app, prefix = "") => {
  const files = fs.readdirSync(directory);
  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      const newPrefix = path.join(prefix, file);
      registerRoutes(filePath, app, newPrefix);
    } else if (file === "route.js") {
      const routePath = path.join(prefix, path.parse(file).name);
      const route = require(filePath);
      app.use("/api", route);
      if (logRoutes) {
        console.log("=======Route=======");
        console.log(`Route    \"${routePath}\"    is registered`);
        route.stack.forEach((layer) => {
          if (layer.route) {
            const { path, methods } = layer.route;
            console.log(`"${path}" : ${Object.keys(methods).join(", ")}`);
          }
        });
        console.log("===================");
      }
    }
  });
};

module.exports = registerRoutes;
