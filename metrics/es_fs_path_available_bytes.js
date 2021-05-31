/**
 * es_fs_path_available_bytes{
 *    cluster="local-cluster",
 *    clusterDNS="maint5.eu-central-1.aws.openpaas-maint.axa-cloud.com",
 *    clusterID="5991493a-8bda-477f-a07b-b7e7caf15f5e",
 *    container="proxy",
 *    endpoint="elasticsearch",
 *    instance="10.94.46.10:60001",
 *    job="elasticsearch-metrics",
 *    mount="/elasticsearch/persistent (/dev/nvme2n1)",
 *    namespace="openshift-logging",
 *    node="elasticsearch-cdm-f6mpxy5j-1",
 *    nodeid="E_4YEpDYSNqVe4omyWNdkg",
 *    path="/elasticsearch/persistent/elasticsearch/data/nodes/0",
 *    pod="elasticsearch-cdm-f6mpxy5j-1-775f78b675-qbbd6",
 *    prometheus="openshift-monitoring/k8s",
 *    receive="true",
 *    service="elasticsearch-metrics",
 *    tenant_id="0db6b321-64cd-4956-8db0-8fd5cd8f12d8",
 *    type="ext4"} 222307766272
 */

const prom = require("prom-client");
const Registries = require("../registries");
const registries = new Registries().getInstance();

class Metric {
  constructor(mount, capacity) {
    // Each metric has its own registry to avoid duplicate name conflicts
    this.registry = new prom.Registry();
    registries.register(this.registry);
    // configure properties and labels here
    this.metric = new prom.Gauge({
      name: "es_fs_path_available_bytes",
      help: "mock es_fs_path_available_bytes",
      labelNames: ["endpoint", "job", "mount"],
      registers: [this.registry],
    });
    this.labels = {
      endpoint: "elasticsearch",
      job: "elasticsearch-metrics",
      mount: mount,
    };
    this.capacity = capacity;
    this.pctfree = 0.45;
  }

  // configure generated values here
  update() {
    let value =
      this.capacity * ((Math.random() - 0.5) * this.pctfree + this.pctfree);
    this.metric.labels(this.labels).set(value);
  }

  // trigger data generation here
  start() {
    this.update();
    setInterval(this.update.bind(this), 30 * 1000);
  }
}

// Configure all your instances here
new Metric("mount-1", 20 * 1024 * 1024 * 1024).start();
new Metric("mount-2", 20 * 1024 * 1024 * 1024).start();
new Metric("mount-3", 20 * 1024 * 1024 * 1024).start();
