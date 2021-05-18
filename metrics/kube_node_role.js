/**
 *  kube_node_role{
 *    cluster="maint7",
 *    clusterID="25e21c95-bfc5-4853-bc3b-ae09c1c74094",
 *    container="kube-rbac-proxy-main",
 *    endpoint="https-main",
 *    job="kube-state-metrics",
 *    namespace="openshift-monitoring",
 *    node="maint7-ocp-compute-default-static-blue-0-6nm86",
 *    prometheus="openshift-monitoring/k8s",
 *    receive="true",
 *    role="worker",
 *    service="kube-state-metrics",
 *    tenant_id="0db6b321-64cd-4956-8db0-8fd5cd8f12d8"
 *  }
 *
 */

const prom = require("prom-client");
const Registries = require("../registries");
const registries = new Registries().getInstance();

class Metric {
  constructor(instance, role) {
    // Each metric has its own registry to avoid duplicate name conflicts
    this.registry = new prom.Registry();
    registries.register(this.registry);
    // configure properties and labels here
    this.metric = new prom.Gauge({
      name: "kube_node_role",
      help: "mock kube_node_role",
      labelNames: ["instance", "role"],
      registers: [this.registry],
    });
    this.labels = {
      instance: instance,
      role: role,
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
    setInterval(this.update.bind(this), 24*60*60*1000);
  }
}

// Configure all your instances here
new Metric("node-1", "master").start();
new Metric("node-2", "master").start();
new Metric("node-3", "master").start();
