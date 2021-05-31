
/**
 * kube_node_labels{
 *    app_zone_name="shared-prod",
 *    application_role="egress-external",
 *    cluster="local-cluster",
 *    clusterID="5991493a-8bda-477f-a07b-b7e7caf15f5e",
 *    instance="maint5_eu_central_1_aws",
 *    label_beta_kubernetes_io_arch="amd64",
 *    label_beta_kubernetes_io_instance_type="t3.xlarge",
 *    label_beta_kubernetes_io_os="linux",
 *    label_failure_domain_axa_cloud_com_zone="1",
 *    label_failure_domain_beta_kubernetes_io_region="eu-central-1",
 *    label_failure_domain_beta_kubernetes_io_zone="eu-central-1a",
 *    label_feature_node_kubernetes_io_cpu_cpuid_ADX="true",
 *    label_feature_node_kubernetes_io_cpu_cpuid_AESNI="true",
 *    label_feature_node_kubernetes_io_cpu_cpuid_AVX="true",
 *    label_feature_node_kubernetes_io_cpu_cpuid_AVX2="true",
 *    label_feature_node_kubernetes_io_cpu_cpuid_AVX512BW="true",
 *    label_feature_node_kubernetes_io_cpu_cpuid_AVX512CD="true",
 *    label_feature_node_kubernetes_io_cpu_cpuid_AVX512DQ="true",
 *    label_feature_node_kubernetes_io_cpu_cpuid_AVX512F="true",
 *    label_feature_node_kubernetes_io_cpu_cpuid_AVX512VL="true",
 *    label_feature_node_kubernetes_io_cpu_cpuid_FMA3="true",
 *    label_feature_node_kubernetes_io_cpu_cpuid_HLE="true",
 *    label_feature_node_kubernetes_io_cpu_cpuid_MPX="true",
 *    label_feature_node_kubernetes_io_cpu_cpuid_RTM="true",
 *    label_feature_node_kubernetes_io_cpu_hardware_multithreading="true",
 *    label_feature_node_kubernetes_io_custom_rdma_available="true",
 *    label_feature_node_kubernetes_io_kernel_selinux_enabled="true",
 *    label_feature_node_kubernetes_io_kernel_version_full="4.18.0-193.47.1.el8_2.x86_64",
 *    label_feature_node_kubernetes_io_kernel_version_major="4",
 *    label_feature_node_kubernetes_io_kernel_version_minor="18",
 *    label_feature_node_kubernetes_io_kernel_version_revision="0",
 *    label_feature_node_kubernetes_io_pci_1d0f_present="true",
 *    label_feature_node_kubernetes_io_storage_nonrotationaldisk="true",
 *    label_feature_node_kubernetes_io_system_os_release_ID="rhcos",
 *    label_feature_node_kubernetes_io_system_os_release_VERSION_ID="4.6",
 *    label_feature_node_kubernetes_io_system_os_release_VERSION_ID_major="4",
 *    label_feature_node_kubernetes_io_system_os_release_VERSION_ID_minor="6",
 *    label_kubernetes_io_arch="amd64",
 *    label_kubernetes_io_hostname="ip-100-79-2-210",
 *    label_kubernetes_io_os="linux",
 *    label_node_kubernetes_io_instance_type="t3.xlarge",
 *    label_node_openshift_io_os_id="rhcos",
 *    label_topology_ebs_csi_aws_com_zone="eu-central-1a",
 *    label_topology_kubernetes_io_region="eu-central-1",
 *    label_topology_kubernetes_io_zone="eu-central-1a",
 *    mcp="egress-external",
 *    monitor_name="openpaas-prod-prometheus.shared-tools-int",
 *    node="ip-100-79-2-210.eu-central-1.compute.internal",
 *    receive="true",
 *    tenant_id="0db6b321-64cd-4956-8db0-8fd5cd8f12d8"
 *  }	1
 */

const prom = require("prom-client");
const Registries = require("../registries");
const registries = new Registries().getInstance();

class Metric {
  constructor(node, mcp) {
    // Each metric has its own registry to avoid duplicate name conflicts
    this.registry = new prom.Registry();
    registries.register(this.registry);
    // configure properties and labels here
    this.metric = new prom.Gauge({
      name: "kube_node_labels",
      help: "mock kube_node_labels",
      labelNames: ["node", "mcp"],
      registers: [this.registry],
    });
    this.labels = {
      node: node,
      mcp: mcp,
    };
  }

  // configure generated values here
  update() {
    let value = 1;
    this.metric.labels(this.labels).set(value);
  }

  // trigger data generation here
  start() {
    this.update();
    setInterval(this.update.bind(this), 5*60*1000);
  }
}

// Configure all your instances here
new Metric("node-1", "egress-external").start();
new Metric("node-2", "ingress-shared-tools").start();
new Metric("node-3", "infra-openshift").start();
new Metric("node-4", "infra-logging").start();
new Metric("node-5", "infra-openpaas").start();
new Metric("node-6", "ocp-compute-default-static").start();
