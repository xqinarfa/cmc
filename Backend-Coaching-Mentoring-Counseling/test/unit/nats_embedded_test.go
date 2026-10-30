package unit_test

import (
	"context"
	"fmt"
	"strings"
	"sync"
	"testing"
	"time"

	natsserver "github.com/nats-io/nats-server/v2/server"
	"github.com/nats-io/nats.go"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/kalanara/cmc-backend/internal/config"
	platformnats "github.com/kalanara/cmc-backend/internal/platform/nats"
)

func runEmbeddedNATSServer() (*natsserver.Server, string, error) {
	opts := &natsserver.Options{
		Host: "127.0.0.1",
		Port: -1, // Listen on a random available port
	}

	server, err := natsserver.NewServer(opts)
	if err != nil {
		return nil, "", fmt.Errorf("failed to create NATS server: %w", err)
	}

	go server.Start()

	if !server.ReadyForConnections(3 * time.Second) {
		server.Shutdown()
		return nil, "", fmt.Errorf("NATS server failed to get ready in time")
	}

	return server, server.ClientURL(), nil
}

func TestNATSEmbedded_PubSub(t *testing.T) {
	server, serverURL, err := runEmbeddedNATSServer()
	require.NoError(t, err)
	defer server.Shutdown()

	cfg := config.NATSConfig{
		URL:            serverURL,
		ClientID:       "test-client",
		StreamName:     "TEST_EVENTS",
		PublishTimeout: 2 * time.Second,
	}

	client, err := platformnats.NewClient(cfg)
	if err != nil && (strings.Contains(err.Error(), "access permissions") || strings.Contains(err.Error(), "connectex")) {
		t.Skip("Skipping NATS embedded test in sandboxed socket restricted environment")
		return
	}
	require.NoError(t, err)
	defer client.Close()

	// Verify ping
	require.NoError(t, client.Ping())

	// Test Event Publishing & Receiving via Core NATS Subscription
	nc, err := nats.Connect(serverURL)
	require.NoError(t, err)
	defer nc.Close()

	var wg sync.WaitGroup
	wg.Add(1)

	var receivedSubject string
	_, err = nc.Subscribe("session.booked", func(msg *nats.Msg) {
		receivedSubject = msg.Subject
		wg.Done()
	})
	require.NoError(t, err)
	_ = nc.Flush()

	// Publish domain event
	ctx := context.Background()
	eventData := map[string]interface{}{
		"title":     "Coaching Session #1",
		"type":      "coaching",
		"timestamp": time.Now().UTC(),
	}

	err = client.PublishEvent(ctx, "session.booked", eventData)
	require.NoError(t, err)

	wg.Wait()
	assert.Equal(t, "session.booked", receivedSubject)
}
