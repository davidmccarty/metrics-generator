/**
 * Create express server exposing configured metrics
 */

const express = require("express");
const app = express();
const port = 3000;

// Configure metrics
const Registries = require("./registries");
const registries = new Registries().getInstance();
require("./metrics");

// Listen on localhost:3000/metrics to dump metrics
app.get("/metrics", async function (req, res) {
  console.log("/metrics");
  const metricsText = await registries.metrics();
  console.log(metricsText);
  res.set("Content-Type", "text/plain; version=0.0.4; charset=utf-8");
  res.send(metricsText);
});

// Listen on localhost:3000/ for heartbeat
app.get("/", function (req, res) {
  console.log("ping");
  res.set("Content-Type", "text/html");
  res.send("ping");
});

app.listen(port, () => {
  console.log(`metrics-generator app listening at http://localhost:${port}`);
});
