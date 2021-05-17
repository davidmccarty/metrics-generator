/**
 * Sample metric - use this as template for creating new gauge metrics
 *               - don't forget to then register the metric in _metrics.js
 *
 */

const prom = require("prom-client");
const Registries = require("../Registries");
const registries = new Registries().getInstance();

class Metric {
  constructor(namespace, pod, id) {
    // Each metric has its own registry to avoid duplicate name conflicts
    this.registry = new prom.Registry();
    registries.register(this.registry);
    // configure properties and labels here
    this.metric = new prom.Gauge({
      name: "sample_gauge",
      help: "This is a sample gauge to copy",
      labelNames: ["namespace", "pod", "id"],
      registers: [this.registry],
    });
    this.labels = {
      namespace: namespace,
      pod: pod,
      id: id,
    };
  }

  // configure generated values here
  update() {
    const max = 10;
    const min = 0;
    const value = Math.floor(Math.random() * (max - min) + min);
    this.metric.labels(this.labels).set(value);
  }

  // trigger data generation here
  start() {
    setInterval(this.update.bind(this), 5000);
  }
}

// Configure all your instances here
new Metric("ns1", "pod1", "id1").start();
new Metric("ns2", "pod2", "id2").start();
