
/**
 * kube_node_status_allocatable_cpu_cores{
 *  cluster="local-cluster",
 *  clusterID="5991493a-8bda-477f-a07b-b7e7caf15f5e",
 *  container="kube-rbac-proxy-main",endpoint="https-main",
 *  job="kube-state-metrics",
 *  namespace="openshift-monitoring",
 *  node="ip-100-79-2-100.eu-central-1.compute.internal",
 *  prometheus="openshift-monitoring/k8s",
 *  receive="true",
 *  service="kube-state-metrics",
 *  tenant_id="0db6b321-64cd-4956-8db0-8fd5cd8f12d8"
 * }
 */

const prom = require("prom-client");
const Registries = require("../registries");
const registries = new Registries().getInstance();

class Metric {
  constructor(node, val) {
    // Each metric has its own registry to avoid duplicate name conflicts
    this.registry = new prom.Registry();
    registries.register(this.registry);
    // configure properties and labels here
    this.metric = new prom.Gauge({
      name: "kube_node_status_allocatable_cpu_cores",
      help: "mock kube_node_status_allocatable_cpu_cores",
      labelNames: ["node"],
      registers: [this.registry],
    });
    this.labels = {
      node: node,
    };
    this.val = val;
  }

  // configure generated values here
  update() {
    let value = this.val;
    this.metric.labels(this.labels).set(value);
  }

  // trigger data generation here
  start() {
    this.update();
    setInterval(this.update.bind(this), 5*60*1000);
  }
}

// Configure all your instances here
new Metric("node-1", 1).start();
new Metric("node-2", 1).start();
new Metric("node-3", 1).start();
new Metric("node-4", 1).start();
new Metric("node-5", 1).start();
new Metric("node-6", 1).start();
