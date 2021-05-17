/**
 * Sample metric - use this as template for creating new counter metrics
 *               - don't forget to then register the metric in _metrics.js
 */

const prom = require("prom-client");
const Registries = require("../registries");
const registries = new Registries().getInstance();

class Metric {
  constructor(namespace, pod, id) {
    // Each metric has its own registry to avoid duplicate name conflicts
    this.registry = new prom.Registry();
    registries.register(this.registry);
    // configure properties and labels here
    this.metric = new prom.Counter({
      name: "sample_counter",
      help: "This is a sample counter to copy",
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
    const max = 0.0001;
    const min = 0.00001;
    let increment = Math.random() * (max - min) + min;
    this.metric.labels(this.labels).inc(increment);
    console.log('updated sample_counter:' + increment);
  }

  // trigger data generation here
  start() {
    setInterval(this.update.bind(this), 5000);
  }
}

// Configure all your instances here
new Metric("ns1", "pod1", "id1").start();
new Metric("ns2", "pod2", "id2").start();
