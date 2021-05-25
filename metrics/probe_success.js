
/**
 * probe_success{
 *    instance="https://default.artifactory.pink.eu-central-1.aws.openpaas.axa-cloud.com/artifactory/webapp/",
 *    job="blackbox",
 *    target="https://default.artifactory.pink.eu-central-1.aws.openpaas.axa-cloud.com/artifactory/webapp/"
 *  }
 */

const prom = require("prom-client");
const Registries = require("../registries");
const registries = new Registries().getInstance();

class Metric {
  constructor(target, pct) {
    // Each metric has its own registry to avoid duplicate name conflicts
    this.registry = new prom.Registry();
    registries.register(this.registry);
    // configure properties and labels here
    this.metric = new prom.Gauge({
      name: "probe_success",
      help: "mock probe_success",
      labelNames: ["target"],
      registers: [this.registry],
    });
    this.labels = {
      target: target,
    };
    this.pct = pct;
  }

  // configure generated values here
  update() {
    let value = 0;
    if(Math.random() > this.pct){
      value = 1;
    }
    this.metric.labels(this.labels).set(value);
  }

  // trigger data generation here
  start() {
    this.update();
    setInterval(this.update.bind(this), 5*60*1000);
  }
}

// Configure all your instances here
new Metric("url.artifactory.1", 0.9).start();
