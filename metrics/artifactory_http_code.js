
/**
 * artifactory_http_code{
 *    artifactory="artifactory.asia.axa-cloud.com",
 *    exported_instance="merlot.eu-central-1.aws-dev",
 *    exported_job="monart",
 *    instance="pushgateway-service:9091",
 *    job="pushgateway",
 *    namespace="monart-dev-ats-openpaas-cc",
 *    operation="download",
 *    stage="dev"
 *  }	200
 */

const prom = require("prom-client");
const Registries = require("../registries");
const registries = new Registries().getInstance();

class Metric {
  constructor(artifactory, operation, pct) {
    // Each metric has its own registry to avoid duplicate name conflicts
    this.registry = new prom.Registry();
    registries.register(this.registry);
    // configure properties and labels here
    this.metric = new prom.Gauge({
      name: "artifactory_http_code",
      help: "mock artifactory_http_code",
      labelNames: ["artifactory", "operation"],
      registers: [this.registry],
    });
    this.labels = {
      artifactory: artifactory,
      operation: operation,
    };
    this.pct = pct;
  }

  // configure generated values here
  update() {
    let value = 200;
    if(Math.random() > this.pct){
      value = 500;
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
new Metric("url.artifactory.1", "upload", 0.9).start();
new Metric("url.artifactory.1", "download", 0.9).start();
