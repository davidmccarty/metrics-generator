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
  constructor(secret) {
    // Each metric has its own registry to avoid duplicate name conflicts
    this.registry = new prom.Registry();
    registries.register(this.registry);
    // configure properties and labels here
    this.metric = new prom.Gauge({
      name: "expiryTime",
      help: "mock expiryTime",
      labelNames: ["exported_job", "secret"],
      registers: [this.registry],
    });
    this.labels = {
      exported_job: "appzone-router-cert-expiry-monitor",
      secret: secret,
    };
  }

  // configure generated values here
  update() {
    const min = 0;
    const max = 120;
    const days = Math.floor(Math.random() * (max - min) + min);
    const expireDate = Date.now() + (days * 24 * 60 * 60 * 1000);
    let value = expireDate / 1000;
    this.metric.labels(this.labels).set(value);
  }

  // trigger data generation here
  start() {
    this.update();
    setInterval(this.update.bind(this), 24*60*60*1000);
  }
}

// Configure all your instances here
new Metric("secret-1").start();
