
/**
 * kube_deployment_spec_replicas{
 *    cluster="local-cluster",
 *    clusterID="5991493a-8bda-477f-a07b-b7e7caf15f5e",
 *    container="kube-rbac-proxy-main",
 *    deployment="auxiliary-network-policies-controller",
 *    endpoint="https-main",
 *    instance="10.94.33.8:8443",
 *    job="kube-state-metrics",
 *    namespace="openpaas-controllers-prod-ats-openpaas-cc",
 *    pod="kube-state-metrics-fbfd57576-2twsf",
 *    prometheus="openshift-monitoring/k8s",
 *    receive="true",
 *    service="kube-state-metrics",
 *    tenant_id="0db6b321-64cd-4956-8db0-8fd5cd8f12d8"
 *  }
 */

const prom = require("prom-client");
const Registries = require("../registries");
const registries = new Registries().getInstance();

class Metric {
  constructor(deployment) {
    // Each metric has its own registry to avoid duplicate name conflicts
    this.registry = new prom.Registry();
    registries.register(this.registry);
    // configure properties and labels here
    this.metric = new prom.Gauge({
      name: "kube_deployment_spec_replicas",
      help: "mock kube_deployment_spec_replicas",
      labelNames: ["namespace", "deployment"],
      registers: [this.registry],
    });
    this.labels = {
      namespace: "openpaas-controllers-prod-ats-openpaas-cc",
      deployment: deployment,
    };
  }

  // configure generated values here
  update() {
    const value = 3;
    this.metric.labels(this.labels).set(value);
  }

  // trigger data generation here
  start() {
    this.update();
    setInterval(this.update.bind(this), 60000);
  }
}

// Configure all your instances here
new Metric("controller-1").start();
new Metric("controller-2").start();
new Metric("controller-3").start();
new Metric("controller-4").start();
