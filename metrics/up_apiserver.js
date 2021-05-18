/**
 *  up{
 *    apiserver="kube-apiserver",
 *    cluster="local-cluster",
 *    clusterID="5991493a-8bda-477f-a07b-b7e7caf15f5e",
 *    endpoint="https",
 *    instance="100.79.2.123:6443",
 *    job="apiserver",
 *    namespace="default",
 *    prometheus="openshift-monitoring/k8s",
 *    receive="true",
 *    service="kubernetes",
 *    tenant_id="0db6b321-64cd-4956-8db0-8fd5cd8f12d8"
 *  } = 1
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
      name: "up",
      help: "mock up",
      labelNames: ["job"],
      registers: [this.registry],
    });
    this.labels = {
      job: "apiserver",
    };
  }

  // configure generated values here
  update() {
    const value = 1;
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
