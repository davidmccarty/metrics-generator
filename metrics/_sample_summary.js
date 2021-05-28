/**
 * Sample metric - use this as template for creating new summary metrics
 *               - don't forget to then register the metric in metrics.js
 *
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
    this.metric = new prom.Summary({
      name: "sample_summary",
      help: "This is a sample summary to copy",
      labelNames: ["namespace", "pod", "id"],
      percentiles: [0.01, 0.1, 0.9, 0.99],
      registers: [this.registry],
    });
    this.labels = {
      namespace: namespace,
      pod: pod,
      id: id,
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
    const max = 2;
    const min = 0.001;
    let value = Math.abs(this.randomGaussian(5) - 0.5) * (max - min) + min;
    this.metric.labels(this.labels).observe(value);
  }

  // trigger data generation here
  start() {
    this.update();
    setInterval(this.update.bind(this), 10000);
  }
}

// Configure all your instances here
new Metric("ns1", "pod1", "id1").start();
new Metric("ns2", "pod2", "id2").start();
