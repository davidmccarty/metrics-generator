
/**
 * container_memory_working_set_bytes{
 *    axa_cloud_com_app_zone_name="shared-prod",
 *    axa_cloud_com_application_role="egress-external",
 *    axa_cloud_com_mcp="egress-external",
 *    cluster="local-cluster",
 *    clusterID="5991493a-8bda-477f-a07b-b7e7caf15f5e",
 *    container="POD",failure_domain_axa_cloud_com_zone="1",
 *    failure_domain_beta_kubernetes_io_zone="eu-central-1a",
 *    id="/kubepods.slice/kubepods-besteffort.slice/kubepods-besteffort-pod079eff4b_c07c_41d4_86b0_5e24ccb88145.slice/crio-b831dc86baf13beca19abef7ac3eb1a6eaf96702f3ffb0198cf252a114f54bd5.scope",
 *    image="quay.io/openshift-release-dev/ocp-v4.0-art-dev@sha256:c0457d8ef9889c20337cee4e6fcafdeb8becc896f4c383e00bceb966f0a05806",
 *    instance="ip-100-79-2-210.eu-central-1.compute.internal",
 *    job="kubernetes-cadvisor",
 *    kubernetes_io_hostname="ip-100-79-2-210",
 *    monitor_name="openpaas-prod-prometheus.shared-tools-int",
 *    name="k8s_POD_cloudwatch-agent-rg22x_cloudwatch-agent-maint-ats-openpaas-cc_079eff4b-c07c-41d4-86b0-5e24ccb88145_0",
 *    namespace="cloudwatch-agent-maint-ats-openpaas-cc",
 *    pod="cloudwatch-agent-rg22x",
 *    receive="true",
 *    tenant_id="0db6b321-64cd-4956-8db0-8fd5cd8f12d8",
 *    topology_ebs_csi_aws_com_zone="eu-central-1a"} 7225344
 */

const prom = require("prom-client");
const Registries = require("../registries");
const registries = new Registries().getInstance();

class Metric {
  constructor(instance, mcp, container, pod, val) {
    // Each metric has its own registry to avoid duplicate name conflicts
    this.registry = new prom.Registry();
    registries.register(this.registry);
    // configure properties and labels here
    this.metric = new prom.Gauge({
      name: "container_memory_working_set_bytes",
      help: "mock container_memory_working_set_bytes",
      labelNames: ["axa_cloud_com_mcp", "instance", "container", "pod"],
      registers: [this.registry],
    });
    this.labels = {
      axa_cloud_com_mcp: mcp,
      instance: instance,
      container: container,
      pod: pod,
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
    const max = this.val * 1.2;
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
new Metric("node-1", "egress-external", "container-1", "pod-1", 30).start();
new Metric("node-2", "ingress-shared-tools", "container-1", "pod-1", 35).start();
new Metric("node-3", "infra-openshift", "container-1", "pod-1", 40).start();
new Metric("node-4", "infra-logging", "container-1", "pod-1", 45).start();
new Metric("node-5", "infra-openpaas", "container-1", "pod-1", 50).start();
new Metric("node-6", "ocp-compute-default-static", "container-1", "pod-1", 55).start();
