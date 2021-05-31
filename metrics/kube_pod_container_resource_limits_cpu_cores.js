
/**
 * kube_pod_container_resource_limits_cpu_cores{
 *    cluster="local-cluster",
 *    clusterID="5991493a-8bda-477f-a07b-b7e7caf15f5e",
 *    container="air-cidr-checker",
 *    endpoint="https-main",
 *    job="kube-state-metrics",
 *    namespace="tools-ats-openpaas-cc",node="ip-100-79-2-106.eu-central-1.compute.internal",
 *    pod="air-cidr-checker-5b7888c887-6425f",
 *    prometheus="openshift-monitoring/k8s",
 *    receive="true",
 *    service="kube-state-metrics",
 *    tenant_id="0db6b321-64cd-4956-8db0-8fd5cd8f12d8"
 *  }
 */

const prom = require("prom-client");
const Registries = require("../registries");
const registries = new Registries().getInstance();

class Metric {
  constructor(node, container, pod, val) {
    // Each metric has its own registry to avoid duplicate name conflicts
    this.registry = new prom.Registry();
    registries.register(this.registry);
    // configure properties and labels here
    this.metric = new prom.Gauge({
      name: "kube_pod_container_resource_limits_cpu_cores",
      help: "mock kube_pod_container_resource_limits_cpu_cores",
      labelNames: ["node", "container", "pod"],
      registers: [this.registry],
    });
    this.labels = {
      node: node,
      container: container,
      pod, pod,
    };
    this.val = val;
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
    const max = this.val * 1.1;
    const min = this.val * 0.8;
    let value = Math.abs(this.randomGaussian(3)) * (max - min) + min;
    this.metric.labels(this.labels).set(value);
  }

  // trigger data generation here
  start() {
    this.update();
    setInterval(this.update.bind(this), 5*60*1000);
  }
}

// Configure all your instances here
new Metric("node-1", "container-1", "pod-1", 0.55).start();
new Metric("node-2", "container-1", "pod-1", 0.65).start();
new Metric("node-3", "container-1", "pod-1", 0.75).start();
new Metric("node-4", "container-1", "pod-1", 0.85).start();
new Metric("node-5", "container-1", "pod-1", 0.95).start();
new Metric("node-6", "container-1", "pod-1", 1.05).start();
