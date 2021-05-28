/**
 * etcd_disk_wal_fsync_duration_seconds_bucket{
 *    cluster="local-cluster",
 *    clusterID="5991493a-8bda-477f-a07b-b7e7caf15f5e",
 *    endpoint="etcd-metrics",
 *    instance="100.79.2.123:9979",
 *    job="etcd",
 *    le="+Inf",
 *    namespace="openshift-etcd",
 *    pod="etcd-ip-100-79-2-123.eu-central-1.compute.internal",
 *    prometheus="openshift-monitoring/k8s",
 *    receive="true",
 *    service="etcd",
 *    tenant_id="0db6b321-64cd-4956-8db0-8fd5cd8f12d8"
 *  }
 *
 */

const prom = require("prom-client");
const Registries = require("../registries");
const registries = new Registries().getInstance();

class Metric {
  constructor(instance) {
    // Each metric has its own registry to avoid duplicate name conflicts
    this.registry = new prom.Registry();
    registries.register(this.registry);
    // configure properties and labels here
    this.metric = new prom.Histogram({
      name: "etcd_disk_wal_fsync_duration_seconds",
      help: "mock etcd_disk_wal_fsync_duration_seconds",
      labelNames: ["namespace", "instance"],
      buckets: [0.1, 0.2, 0.5, 1.0, 2.0, 5.0],
      registers: [this.registry],
    });
    this.labels = {
      namespace: "openshift-etcd",
      instance: instance,
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
    const max = 0.8;
    const min = 0.001;
    let value = Math.abs(this.randomGaussian(8) - 0.5) * (max - min) + min;
    this.metric.labels(this.labels).observe(value);
  }

  // trigger data generation here
  start() {
    this.update();
    setInterval(this.update.bind(this), 100);
  }
}

// Configure all your instances here
new Metric("pod1").start();
new Metric("pod2").start();
new Metric("pod3").start();
