
/**
 * probe_http_status_code{
 *    cluster="local-cluster",
 *    clusterID="5991493a-8bda-477f-a07b-b7e7caf15f5e",
 *    instance="https://default.artifactory.pink.eu-central-1.aws.openpaas.axa-cloud.com/artifactory/webapp/",
 *    job="blackbox",
 *    monitor_name="openpaas-prod-prometheus.shared-tools-int",
 *    receive="true",
 *    target="https://default.artifactory.pink.eu-central-1.aws.openpaas.axa-cloud.com/artifactory/webapp/",
 *    tenant_id="0db6b321-64cd-4956-8db0-8fd5cd8f12d8"
 *  }
 */

const prom = require("prom-client");
const Registries = require("../registries");
const registries = new Registries().getInstance();

class Metric {
  constructor(instance, pct) {
    // Each metric has its own registry to avoid duplicate name conflicts
    this.registry = new prom.Registry();
    registries.register(this.registry);
    // configure properties and labels here
    this.metric = new prom.Counter({
      name: "probe_http_status_code",
      help: "mock probe_http_status_code",
      labelNames: ["instance"],
      registers: [this.registry],
    });
    this.labels = {
      instance: instance,
    };
    this.pct = pct;
  }

  // configure generated values here
  update() {
    let value = 200;
    if(Math.random() > this.pct){
      value = 500;
    }
    this.metric.labels(this.labels).inc(value);
  }

  // trigger data generation here
  start() {
    this.update();
    setInterval(this.update.bind(this), 5*60*1000);
  }
}

// Configure all your instances here
new Metric("url.artifactory.1", 0.9).start();
new Metric("url.artifactory.2", 0.99).start();
