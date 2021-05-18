
/**
 * instance:node_cpu_utilisation:rate1m{
 *    cluster="local-cluster",
 *    clusterID="5991493a-8bda-477f-a07b-b7e7caf15f5e",
 *    container="kube-rbac-proxy",
 *    endpoint="https",
 *    instance="ip-100-79-2-100.eu-central-1.compute.internal",
 *    job="node-exporter",
 *    namespace="openshift-monitoring",
 *    pod="node-exporter-h4c29",
 *    prometheus="openshift-monitoring/k8s",
 *    receive="true",
 *    service="node-exporter",
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
    this.metric = new prom.Gauge({
      name: "instance:node_cpu_utilisation:rate1m",
      help: "mock instance:node_cpu_utilisation:rate1m",
      labelNames: ["instance", ],
      registers: [this.registry],
    });
    this.labels = {
      instance: instance,
    };
    this.pct = pct;
  }

  // configure generated values here
  update() {
    const min = this.pct / 2;
    const max = this.pct * 2;
    const value = Math.random() * (max - min) + min;
    this.metric.labels(this.labels).set(value);
  }

  // trigger data generation here
  start() {
    this.update();
    setInterval(this.update.bind(this), 60000);
  }
}

// Configure all your instances here
new Metric("node-1", 0.3).start();
new Metric("node-2", 0.35).start();
new Metric("node-3", 0.25).start();
