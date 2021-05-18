/**
 *  cluster_version{
 *    endpoint="metrics",
 *    from_version="4.6.21",
 *    image="quay.io/openshift-release-dev/ocp-release@sha256:b5af95afb4847537034b4b6e58aacf7c2223cd7de731278d58385656fc196c5d",
 *    instance="100.79.2.123:9099",
 *    job="cluster-version-operator",
 *    namespace="openshift-cluster-version",
 *    pod="cluster-version-operator-65bb84f75f-txjh2",
 *    prometheus="openshift-monitoring/k8s",
 *    receive="true",
 *    service="cluster-version-operator",
 *    tenant_id="0db6b321-64cd-4956-8db0-8fd5cd8f12d8",
 *    type="current",
 *    version="4.6.22"} = 1617123755
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
      name: "cluster_version",
      help: "mock cluster_version",
      labelNames: ["type"],
      registers: [this.registry],
    });
    this.labels = {
      type: "current",
    };
  }

  // configure generated values here
  update() {
    const value = 1617123755;
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
