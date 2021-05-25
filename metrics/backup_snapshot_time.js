/**
 *  backup_snapshot_time{
 *    exported_instance="shell",
 *    exported_job="etcd-backup-exporter",
 *    filename="snapshot_2021-05-19_120001.db",
 *    instance="pushgateway-service:9091",
 *    job="pushgateway"
 *  }
 */

const prom = require("prom-client");
const Registries = require("../registries");
const registries = new Registries().getInstance();

class Metric {
  constructor() {
    // Each metric has its own registry to avoid duplicate name conflicts
    this.registry = new prom.Registry();
    registries.register(this.registry);
    // configure properties and labels here
    this.metric = new prom.Gauge({
      name: "backup_snapshot_time",
      help: "mock backup_snapshot_time",
      labelNames: ["job"],
      registers: [this.registry],
    });
    this.labels = {
      job: "mock-backup"
    };
  }

  // configure generated values here
  update() {
    const value = Date.now() / 1000;
    this.metric.labels(this.labels).set(value);
  }

  // trigger data generation here
  start() {
    this.update();
    setInterval(this.update.bind(this), 7*60*60*1000);
  }
}

// Configure all your instances here
new Metric().start();
