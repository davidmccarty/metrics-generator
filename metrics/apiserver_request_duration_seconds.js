/**
 * apiserver_request_duration_seconds_bucket{
 *    apiserver="kube-apiserver",
 *    cluster="local-cluster",
 *    clusterID="5991493a-8bda-477f-a07b-b7e7caf15f5e",
 *    component="apiserver",
 *    endpoint="https",
 *    group="action.open-cluster-management.io",
 *    instance="100.79.2.123:6443",
 *    job="apiserver",
 *    le="+Inf",
 *    namespace="default",
 *    prometheus="openshift-monitoring/k8s",
 *    receive="true",
 *    resource="managedclusteractions",
 *    scope="cluster",
 *    service="kubernetes",
 *    tenant_id="0db6b321-64cd-4956-8db0-8fd5cd8f12d8",
 *    verb="LIST",
 *    version="v1beta1"
 *  } = 25
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
    this.metric = new prom.Histogram({
      name: "apiserver_request_duration_seconds",
      help: "mock apiserver_request_duration_seconds",
      labelNames: ["job", "verb"],
      percentiles: [0.01, 0.1, 0.9, 0.99],
      registers: [this.registry],
    });
    this.labels = {
      job: "apiserver",
      verb: "GET",
    };
  }

  // v is the number of times random is summed and should be over >= 1
  // return a random number between 0-1 exclusive
  randomGaussian(v) {
    let r = 0;
    for (let i = v; i > 0; i--) {
      r += Math.random();
    }
    return r / v;
  }

  // configure generated values here
  update() {
    const max = 2;
    const min = 0.001;
    let value = Math.abs(this.randomGaussian(5) - 0.5) * (max - min) + min;
    this.metric.labels(this.labels).observe(value);
  }

  // trigger data generation here
  start() {
    this.update();
    setInterval(this.update.bind(this), 100);
  }
}

// Configure all your instances here
new Metric().start();
