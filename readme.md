# metrics-generator
A simple node.js app to expose prometheus format metrics on localhost:3000/metrics.
This can be used inn conjunction with the morph.ocp.rhacm-custom-metrics-collector to push generated metrics to thanos api in rhacm observability component.

## How to run standalone
### Launch the application
1. clone this project
2. npm install
3. node index.js
4. test from Query from http://localhost:3000
### Test with prometheus
1. Create work directory and empty config file
    ```sh
    mkdir prometheus
    cd prometheus
    vi prometheus.yaml
    ```
2. Add following to prometheus.yaml
    ```yaml
    global:
      scrape_interval:     5s # By default, scrape targets every 15 seconds.
      # Attach these labels to any time series or alerts when communicating with
      # external systems (federation, remote storage, Alertmanager).
      external_labels:
        mocked_by: 'metrics-generator'
    rule_files:
      - 'prometheus.rules.yml'
    # A scrape configuration containing exactly one endpoint to scrape:
    scrape_configs:
      # Metrics Generator
      - job_name: 'metrics-generator'
        scrape_interval: 5s
        static_configs:
          - targets: ['host.docker.internal:3000']
    ```
3. Start prometheus as docker container
   ```sh
   docker run -it -p 9090:9090 -v $PWD/prometheus.yaml:/etc/prometheus.yaml prom/prometheus --config.file=/etc/prometheus.yaml --log.level=debug
   ```
4. Query from http://localhost:9090

## How to add metrics
1. create new file in ./metrics (one file per metric name)
2. implement metric class to define required labels
3. implement update() method to genrate required data
4. create and register one or more instances
