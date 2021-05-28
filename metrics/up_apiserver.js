/**
 *  up{
 *    apiserver="kube-apiserver",
 *    cluster="local-cluster",
 *    clusterID="5991493a-8bda-477f-a07b-b7e7caf15f5e",
 *    endpoint="https",
 *    instance="100.79.2.123:6443",
 *    job="apiserver",
 *    namespace="default",
 *    prometheus="openshift-monitoring/k8s",
 *    receive="true",
 *    service="kubernetes",
 *    tenant_id="0db6b321-64cd-4956-8db0-8fd5cd8f12d8"
 *  } = 1
 *
 * up{
 *  cluster="local-cluster",
 *  clusterID="5991493a-8bda-477f-a07b-b7e7caf15f5e",
 *  instance="https://default.artifactory.pink.eu-central-1.aws.openpaas.axa-cloud.com/artifactory/webapp/",
 *  job="blackbox",
 *  monitor_name="openpaas-prod-prometheus.shared-tools-int",
 *  receive="true",
 *  target="https://default.artifactory.pink.eu-central-1.aws.openpaas.axa-cloud.com/artifactory/webapp/",
 *  tenant_id="0db6b321-64cd-4956-8db0-8fd5cd8f12d8"
 * }
 *
 */

const prom = require("prom-client");
const Registries = require("../registries");
const registries = new Registries().getInstance();

class Metric {
  constructor(job, target, pct) {
    // Each metric has its own registry to avoid duplicate name conflicts
    this.registry = new prom.Registry();
    registries.register(this.registry);
    // configure properties and labels here
    this.metric = new prom.Gauge({
      name: "up",
      help: "mock up",
      labelNames: ["job", "target"],
      registers: [this.registry],
    });
    this.labels = {
      job: job,
      target: target,
    };
    this.pct = pct;
  }

  // configure generated values here
  update() {
    let value = 1;
    if(Math.random < this.pct){
      value = 0;
    }
    this.metric.labels(this.labels).set(value);
  }

  // trigger data generation here
  start() {
    this.update();
    setInterval(this.update.bind(this), 30000);
  }
}

// Configure all your instances here
new Metric("apiserver", "", 1.0).start();
new Metric("blackbox", "default.artifactory.url", 0.9).start();
