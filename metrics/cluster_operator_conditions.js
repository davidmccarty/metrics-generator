
/**
 * cluster_operator_conditions{
 *    cluster="local-cluster",
 *    clusterID="5991493a-8bda-477f-a07b-b7e7caf15f5e",
 *    condition="Available",
 *    endpoint="metrics",
 *    instance="100.79.2.123:9099",
 *    job="cluster-version-operator",
 *    name="authentication",
 *    namespace="openshift-cluster-version",
 *    pod="cluster-version-operator-65bb84f75f-txjh2",
 *    prometheus="openshift-monitoring/k8s",
 *    reason="AsExpected",
 *    receive="true",
 *    service="cluster-version-operator",
 *    tenant_id="0db6b321-64cd-4956-8db0-8fd5cd8f12d8"
 *  }
 */

const prom = require("prom-client");
const Registries = require("../registries");
const registries = new Registries().getInstance();

class Metric {
  constructor(instance, pct) {
    // Each metric has its own registry to avoid duplicate name conflicts
    this.registry = new prom.Registry();
    registries.register(this.registry);
    // configure properties and labels here
    this.metric = new prom.Counter({
      name: "cluster_operator_conditions",
      help: "mock cluster_operator_conditions",
      labelNames: ["instance", "condition"],
      registers: [this.registry],
    });
    this.labels = {
      instance: instance,
      condition: "Available",
    };
    this.pct = pct;
    this.lastCondition = "first";
  }

  // configure generated values here
  update() {
    this.labels.condition = "Available";
    if(Math.random() > this.pct){
      this.labels.condition = "Failing";
    }
    if(this.lastCondition != this.labels.condition){
      this.metric.labels(this.labels).inc(1);
      this.lastCondition = this.labels.condition;
    }
  }

  // trigger data generation here
  start() {
    this.update();
    setInterval(this.update.bind(this), 5*60*1000);
  }
}

// Configure all your instances here
new Metric("operator-1", 0.99).start();
new Metric("operator-2", 0.999).start();
new Metric("operator-3", 0.999).start();
new Metric("operator-4", 0.999).start();
