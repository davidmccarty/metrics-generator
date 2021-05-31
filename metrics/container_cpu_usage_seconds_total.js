
/**
 * container_cpu_usage_seconds_total{
 *    cluster="local-cluster",
 *    clusterID="5991493a-8bda-477f-a07b-b7e7caf15f5e",
 *    container="POD",
 *    cpu="total",
 *    endpoint="https-metrics",
 *    id="/kubepods.slice/kubepods-besteffort.slice/kubepods-besteffort-pod079eff4b_c07c_41d4_86b0_5e24ccb88145.slice/crio-b831dc86baf13beca19abef7ac3eb1a6eaf96702f3ffb0198cf252a114f54bd5.scope",
 *    image="quay.io/openshift-release-dev/ocp-v4.0-art-dev@sha256:c0457d8ef9889c20337cee4e6fcafdeb8becc896f4c383e00bceb966f0a05806",
 *    instance="100.79.2.210:10250",
 *    job="kubelet",
 *    metrics_path="/metrics/cadvisor",
 *    name="k8s_POD_cloudwatch-agent-rg22x_cloudwatch-agent-maint-ats-openpaas-cc_079eff4b-c07c-41d4-86b0-5e24ccb88145_0",
 *    namespace="cloudwatch-agent-maint-ats-openpaas-cc",
 *    node="ip-100-79-2-210.eu-central-1.compute.internal",
 *    pod="cloudwatch-agent-rg22x",
 *    prometheus="openshift-monitoring/k8s",
 *    receive="true",
 *    service="kubelet",
 *    tenant_id="0db6b321-64cd-4956-8db0-8fd5cd8f12d8"
 * }
 */

const prom = require("prom-client");
const Registries = require("../registries");
const registries = new Registries().getInstance();

class Metric {
  constructor(node, pod, pct) {
    // Each metric has its own registry to avoid duplicate name conflicts
    this.registry = new prom.Registry();
    registries.register(this.registry);
    // configure properties and labels here
    this.metric = new prom.Counter({
      name: "container_cpu_usage_seconds_total",
      help: "mock container_cpu_usage_seconds_total",
      labelNames: ["node", "pod"],
      registers: [this.registry],
    });
    this.labels = {
      node: node,
      pod, pod
    };
    this.pct = pct;
    this.scrape_secs = 30;
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
    const max = this.scrape_secs * this.pct * 1.25;
    const min = this.scrape_secs * this.pct * 0.75;
    let value = Math.abs(this.randomGaussian(3)) * (max - min) + min;
    this.metric.labels(this.labels).inc(value);
  }

  // trigger data generation here
  start() {
    this.update();
    setInterval(this.update.bind(this), this.scrape_secs * 1000);
  }
}

// Configure all your instances here
new Metric("node-1", "pod-1", 0.20).start();
new Metric("node-2", "pod-1", 0.25).start();
new Metric("node-3", "pod-1", 0.30).start();
new Metric("node-4", "pod-1", 0.35).start();
new Metric("node-5", "pod-1", 0.40).start();
new Metric("node-6", "pod-1", 0.45).start();
