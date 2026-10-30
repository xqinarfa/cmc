package nats

import (
	"context"
	"encoding/json"
	"fmt"
	"log/slog"
	"time"

	"github.com/nats-io/nats.go"
	"github.com/kalanara/cmc-backend/internal/config"
)

type Client struct {
	Conn *nats.Conn
	Js   nats.JetStreamContext
	cfg  config.NATSConfig
}

func NewClient(cfg config.NATSConfig) (*Client, error) {
	opts := []nats.Option{
		nats.Name(cfg.ClientID),
		nats.ReconnectWait(2 * time.Second),
		nats.MaxReconnects(10),
		nats.DisconnectErrHandler(func(c *nats.Conn, err error) {
			slog.Warn("NATS disconnected", "error", err)
		}),
		nats.ReconnectHandler(func(c *nats.Conn) {
			slog.Info("NATS reconnected", "url", c.ConnectedUrl())
		}),
	}

	nc, err := nats.Connect(cfg.URL, opts...)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to NATS at %s: %w", cfg.URL, err)
	}

	js, err := nc.JetStream()
	if err != nil {
		nc.Close()
		return nil, fmt.Errorf("failed to obtain JetStream context: %w", err)
	}

	streamInfo, err := js.StreamInfo(cfg.StreamName)
	if streamInfo == nil || err != nil {
		_, err = js.AddStream(&nats.StreamConfig{
			Name:     cfg.StreamName,
			Subjects: []string{"user.*", "session.*"},
			Storage:  nats.FileStorage,
		})
		if err != nil {
			slog.Warn("Could not initialize JetStream stream (fallback to core NATS messaging)", "stream", cfg.StreamName, "error", err)
		} else {
			slog.Info("JetStream stream configured", "stream", cfg.StreamName)
		}
	}

	return &Client{
		Conn: nc,
		Js:   js,
		cfg:  cfg,
	}, nil
}

func (n *Client) PublishEvent(ctx context.Context, subject string, event interface{}) error {
	if n == nil || n.Conn == nil {
		return nil
	}

	ctxTimeout, cancel := context.WithTimeout(ctx, n.cfg.PublishTimeout)
	defer cancel()

	payload, err := json.Marshal(event)
	if err != nil {
		return fmt.Errorf("failed to marshal event for subject %s: %w", subject, err)
	}

	if n.Js != nil {
		pubAck, err := n.Js.Publish(subject, payload, nats.Context(ctxTimeout))
		if err == nil {
			slog.Debug("JetStream event published", "subject", subject, "stream", pubAck.Stream, "seq", pubAck.Sequence)
			return nil
		}
		slog.Debug("JetStream publish failed, falling back to core NATS publish", "error", err)
	}

	if err := n.Conn.Publish(subject, payload); err != nil {
		return fmt.Errorf("failed to publish to NATS subject %s: %w", subject, err)
	}

	return nil
}

func (n *Client) Ping() error {
	if n.Conn == nil || !n.Conn.IsConnected() {
		return fmt.Errorf("NATS is not connected")
	}
	return nil
}

func (n *Client) Close() {
	if n.Conn != nil {
		_ = n.Conn.Drain()
		n.Conn.Close()
		slog.Info("NATS connection closed")
	}
}
