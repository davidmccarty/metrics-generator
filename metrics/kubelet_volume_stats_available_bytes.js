/**
 * kubelet_volume_stats_available_bytes{
 *    axa_cloud_com_application_role="infra",
 *    axa_cloud_com_mcp="infra-openshift",
 *    failure_domain_axa_cloud_com_zone="0",
 *    failure_domain_beta_kubernetes_io_zone="0",
 *    instance="maint7-ocp-infra-blue-0-858cw",
 *    job="kubelet",kubernetes_io_hostname="maint7-ocp-infra-blue-0-858cw",
 *    namespace="openshift-monitoring",
 *    persistentvolumeclaim="alertmanagermain-pvc1-alertmanager-main-2"
 *  }	20940636160
 */

const prom = require("prom-client");
const Registries = require("../registries");
const registries = new Registries().getInstance();

class Metric {
  constructor(namespace, persistentvolumeclaim, capacity, pctfree) {
    // Each metric has its own registry to avoid duplicate name conflicts
    this.registry = new prom.Registry();
    registries.register(this.registry);
    // configure properties and labels here
    this.metric = new prom.Gauge({
      name: "kubelet_volume_stats_available_bytes",
      help: "mock kubelet_volume_stats_available_bytes",
      labelNames: ["namespace", "persistentvolumeclaim"],
      registers: [this.registry],
    });
    this.labels = {
      namespace: namespace,
      persistentvolumeclaim: persistentvolumeclaim,
    };
    this.capacity = capacity;
    this.pctfree = pctfree;
  }

  // configure generated values here
  update() {
    const value =
      this.capacity * ((Math.random() - 0.5) * this.pctfree + this.pctfree);
    this.metric.labels(this.labels).set(value);
  }

  // trigger data generation here
  start() {
    this.update();
    setInterval(this.update.bind(this), 10 * 60 * 1000);
  }
}

// Configure all your instances here
new Metric("namespace-1", "pvc-1", 20 * 1024 * 1024 * 1024, 0.1).start();
new Metric("namespace-2", "pvc-2", 50 * 1024 * 1024 * 1024, 0.2).start();
new Metric("namespace-3", "pvc-3", 100 * 1024 * 1024 * 1024, 0.5).start();
