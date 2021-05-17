/**
 * Add all global variables here
 */

class RegistriesArray {
  constructor() {
    this.array = [];
  }

  register(registry) {
    this.array.push({ registry });
  }

  async metrics() {
    let aggregatedMetrics = "";
    for (const entry of this.array) {
      const metrics = await entry.registry.metrics();
      aggregatedMetrics += metrics;
    }
    return aggregatedMetrics;
  }
}

class Registries {
  constructor() {
    if (!Registries.instance) {
      Registries.instance = new RegistriesArray();
    }
  }

  getInstance() {
    return Registries.instance;
  }
}

module.exports = Registries;
