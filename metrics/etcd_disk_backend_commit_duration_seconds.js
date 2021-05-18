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
  constructor(instance) {
    // Each metric has its own registry to avoid duplicate name conflicts
    this.registry = new prom.Registry();
    registries.register(this.registry);
    // configure properties and labels here
    this.metric = new prom.Histogram({
      name: "etcd_disk_backend_commit_duration_seconds",
      help: "mock etcd_disk_backend_commit_duration_seconds",
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
    var r = 0;
    for (var i = v; i > 0; i--) {
      r += Math.random();
    }
    return r / v;
  }

  // configure generated values here
  update() {
    const max = 1;
    const min = 0.001;
    const value = Math.abs(this.randomGaussian(8) - 0.5) * (max - min) + min;
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
