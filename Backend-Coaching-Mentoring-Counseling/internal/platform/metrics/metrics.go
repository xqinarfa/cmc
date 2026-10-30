package metrics

import (
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
)

type Metrics struct {
	HTTPRequestsTotal   *prometheus.CounterVec
	HTTPRequestDuration *prometheus.HistogramVec
	GRPCRequestsTotal   *prometheus.CounterVec
}

var globalMetrics *Metrics

func InitMetrics() *Metrics {
	if globalMetrics != nil {
		return globalMetrics
	}

	globalMetrics = &Metrics{
		HTTPRequestsTotal: promauto.NewCounterVec(
			prometheus.CounterOpts{
				Namespace: "cmc",
				Subsystem: "http",
				Name:      "requests_total",
				Help:      "Total number of HTTP requests processed",
			},
			[]string{"method", "path", "status"},
		),
		HTTPRequestDuration: promauto.NewHistogramVec(
			prometheus.HistogramOpts{
				Namespace: "cmc",
				Subsystem: "http",
				Name:      "request_duration_seconds",
				Help:      "Histogram of HTTP request latencies",
				Buckets:   prometheus.DefBuckets,
			},
			[]string{"method", "path"},
		),
		GRPCRequestsTotal: promauto.NewCounterVec(
			prometheus.CounterOpts{
				Namespace: "cmc",
				Subsystem: "grpc",
				Name:      "requests_total",
				Help:      "Total number of gRPC requests processed",
			},
			[]string{"method", "status"},
		),
	}

	return globalMetrics
}

func GetMetrics() *Metrics {
	if globalMetrics == nil {
		return InitMetrics()
	}
	return globalMetrics
}
