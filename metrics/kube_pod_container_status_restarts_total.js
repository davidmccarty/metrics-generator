
/**
 * kube_pod_container_status_restarts_total{
 *    cluster="maint7",
 *    clusterID="25e21c95-bfc5-4853-bc3b-ae09c1c74094",
 *    container="all-cluster-shared-tools-controller",
 *    endpoint="https-main",
 *    job="kube-state-metrics",
 *    namespace="network-access-management-prod-ats-openpaas-cc",
 *    pod="all-cluster-shared-tools-controller-7c468b78d6-mpm55",
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
  constructor(container, pct) {
    // Each metric has its own registry to avoid duplicate name conflicts
    this.registry = new prom.Registry();
    registries.register(this.registry);
    // configure properties and labels here
    this.metric = new prom.Counter({
      name: "kube_pod_container_status_restarts_total",
      help: "mock kube_pod_container_status_restarts_total",
      labelNames: ["namespace", "container"],
      registers: [this.registry],
    });
    this.labels = {
      namespace: "openpaas-controllers-prod-ats-openpaas-cc",
      container: container,
    };
    this.pct = pct;
  }

  // configure generated values here
  update() {
    let value = 0;
    if(Math.random() > this.pct){
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
new Metric("pod-1", 0.9).start();
new Metric("pod-2", 0.99).start();
new Metric("pod-3", 0.999).start();
new Metric("pod-4", 0.999).start();
