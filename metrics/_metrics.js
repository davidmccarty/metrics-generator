/**
 * Load all metrics here
 */

require("./_sample_counter")
require("./_sample_gauge")
require("./_sample_histogram")
require("./_sample_summary")
require("./cluster_version")
require("./backup_snapshot_time")
require("./up_apiserver")
require("./apiserver_request_duration_seconds")
require("./apiserver_request_total")
require("./etcd_disk_wal_fsync_duration_seconds")
require("./etcd_disk_backend_commit_duration_seconds")
require("./kube_deployment_spec_replicas")
require("./kube_deployment_status_replicas_available")
require("./kube_pod_container_status_restarts_total")
require("./instance:node_cpu_utilisation:rate1m")
require("./kube_node_role")
require("./instance:node_memory_utilisation:ratio")
require("./expiryTime")
require("./probe_http_status_code")
require("./cluster_operator_conditions")