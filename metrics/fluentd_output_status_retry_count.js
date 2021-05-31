
/**
 * fluentd_output_status_retry_count{
 *    cluster="local-cluster",
 *    clusterDNS="maint5.eu-central-1.aws.openpaas-maint.axa-cloud.com",
 *    clusterID="5991493a-8bda-477f-a07b-b7e7caf15f5e",
 *    container="fluentd",
 *    endpoint="metrics",
 *    hostname="fluentd-4t9hq",
 *    instance="10.94.41.6:24231",
 *    job="fluentd",namespace="openshift-logging",
 *    plugin_id="default",
 *    pod="fluentd-4t9hq",
 *    prometheus="openshift-monitoring/k8s",
 *    receive="true",service="fluentd",
 *    tenant_id="0db6b321-64cd-4956-8db0-8fd5cd8f12d8",
 *    type="elasticsearch"
 *  }
 */

const prom = require("prom-client");
const Registries = require("../registries");
const registries = new Registries().getInstance();

class Metric {
  constructor() {
    // Each metric has its own registry to avoid duplicate name conflicts
    this.registry = new prom.Registry();
    registries.register(this.registry);
    // configure properties and labels here
    this.metric = new prom.Counter({
      name: "fluentd_output_status_retry_count",
      help: "mock fluentd_output_status_retry_count",
      labelNames: ["job"],
      registers: [this.registry],
    });
    this.labels = {
      job: "fluentd",
    };
  }

  // configure generated values here
  update() {
    let value = 0;
    if(Math.random() > 0.995){
      value = 1;
    }
    this.metric.labels(this.labels).inc(value);
  }

  // trigger data generation here
  start() {
    this.update();
    setInterval(this.update.bind(this), 5000);
  }
}

// Configure all your instances here
new Metric().start();
