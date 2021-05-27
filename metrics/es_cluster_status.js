/**
 * es_cluster_status{
 *    cluster="local-cluster",
 *    clusterDNS="maint5.eu-central-1.aws.openpaas-maint.axa-cloud.com",
 *    clusterID="5991493a-8bda-477f-a07b-b7e7caf15f5e",
 *    container="proxy",
 *    endpoint="elasticsearch",
 *    instance="10.94.46.10:60001",
 *    job="elasticsearch-metrics",
 *    namespace="openshift-logging",
 *    pod="elasticsearch-cdm-f6mpxy5j-1-775f78b675-qbbd6",
 *    prometheus="openshift-monitoring/k8s",
 *    receive="true",
 *    service="elasticsearch-metrics",
 *    tenant_id="0db6b321-64cd-4956-8db0-8fd5cd8f12d8"
 *  }
 *
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
    this.metric = new prom.Gauge({
      name: "es_cluster_status",
      help: "mock es_cluster_status",
      labelNames: ["endpoint", "job"],
      registers: [this.registry],
    });
    this.labels = {
      endpoint: "elasticsearch",
      job: "elasticsearch-metrics",
    };
  }

  // configure generated values here
  update() {
    const value = 0;
    if(Math.random > 0.8){
      value = 1;
    }
    if(Math.random > 0.9){
      value = 2;
    }
    this.metric.labels(this.labels).set(value);
  }

  // trigger data generation here
  start() {
    this.update();
    setInterval(this.update.bind(this), 30000);
  }
}

// Configure all your instances here
new Metric().start();
