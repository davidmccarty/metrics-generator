/**
 * apiserver_request_total{
 *    apiserver="kube-apiserver",
 *    cluster="local-cluster",
 *    clusterID="5991493a-8bda-477f-a07b-b7e7caf15f5e",
 *    code="200",
 *    component="apiserver",
 *    contentType="application/json",
 *    endpoint="https",
 *    group="action.
 *    open-cluster-management.io",
 *    instance="100.79.2.123:6443",
 *    job="apiserver",
 *    namespace="default",
 *    prometheus="openshift-monitoring/k8s",
 *    receive="true",
 *    resource="managedclusteractions",
 *    scope="cluster",
 *    service="kubernetes",
 *    tenant_id="0db6b321-64cd-4956-8db0-8fd5cd8f12d8",
 *    verb="LIST",
 *    version="v1beta1"
 *  } = 123
 */

const prom = require("prom-client");
const Registries = require("../registries");
const registries = new Registries().getInstance();

class Metric {
  constructor(code, pct) {
    // Each metric has its own registry to avoid duplicate name conflicts
    this.registry = new prom.Registry();
    registries.register(this.registry);
    // configure properties and labels here
    this.metric = new prom.Counter({
      name: "apiserver_request_total",
      help: "mock apiserver_request_total",
      labelNames: ["job", "code",],
      registers: [this.registry],
    });
    this.labels = {
      job: "apiserver",
      code: code,
    };
    this.pct = pct;
  }

  // configure generated values here
  update() {
    if( Math.random() < this.pct ){
      this.metric.labels(this.labels).inc(1);
    } else {
      this.metric.labels(this.labels).inc(0);
    };
  }

  // trigger data generation here
  start() {
    this.update();
    setInterval(this.update.bind(this), 60000);
  }
}

// Configure all your instances here
new Metric("200", 0.99).start();
new Metric("500", 0.01).start();
