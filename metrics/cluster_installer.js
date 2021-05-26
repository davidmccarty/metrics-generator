/**
 *  cluster_installer{
 *    cluster="local-cluster",
 *    clusterDNS="maint5.eu-central-1.aws.openpaas-maint.axa-cloud.com",
 *    clusterID="5991493a-8bda-477f-a07b-b7e7caf15f5e",
 *    endpoint="metrics",
 *    instance="100.79.2.68:9099",
 *    invoker="user",
 *    job="cluster-version-operator",
 *    namespace="openshift-cluster-version",
 *    pod="cluster-version-operator-56f7cdff55-x9xwd",
 *    prometheus="openshift-monitoring/k8s",
 *    receive="true",
 *    service="cluster-version-operator",
 *    tenant_id="0db6b321-64cd-4956-8db0-8fd5cd8f12d8",
 *    type="other",
 *    version="v4.6.0"
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
      name: "cluster_installer",
      help: "mock cluster_installer",
      labelNames: ["type"],
      registers: [this.registry],
    });
    this.labels = {
      type: "other",
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
new Metric().start();
