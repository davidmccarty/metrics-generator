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
      scrape_interval:     60s # By default, scrape targets every 15 seconds.
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
Refer - https://github.com/siimon/prom-client
1. create new file in ./metrics (one file per metric name) by copying one of the samples
2. implement metric class to define required anme and labels
3. implement update() method to generate required data
4. implement start() method to set the export interval and begin generating values
5. create and register one or more instances with parameters as necessary for labels, initial values etc.
6. register each new metric name in the `deployment.yml` file so it will be scraped

## How to deploy
1. This builds on the morph.ocp.rhacm-custom-metrics-collector deployment which is a pre-req.
2. Build the docker image for metrics generator and push to docker hub
   ```sh
   # build docker image for metrics generator
   docker build . -f ./deploy/dockerfile-metrics-generator -t davidmccarty/rhacm-metrics-generator
   # test on local
   docker run --rm  --name metrics -p 3000:3000 -d davidmccarty/rhacm-metrics-generator
   docker ps | grep metrics
   docker logs metrics
   http://localhost:3000/metrics
   docker stop metrics
   # push image
   docker push davidmccarty/rhacm-metrics-generator
   ```
3. Build the docker image for metrics prometheus and push to docker hub
   ```sh
   # build docker image for prometheus
   docker build . -f ./deploy/dockerfile-prometheus -t davidmccarty/metrics-prometheus
   # test on local
   docker run --rm  --name prometheus -p 9090:9090 -d davidmccarty/metrics-prometheus
   docker ps | grep prometheus
   docker logs prometheus
   http://localhost:9090
   docker stop prometheus
   # push image
   docker push davidmccarty/metrics-prometheus
   ```
4. For each metrics generator you need to craete a deployment based on deployment.yml
   find and replace `demo-1`to add more instances.
