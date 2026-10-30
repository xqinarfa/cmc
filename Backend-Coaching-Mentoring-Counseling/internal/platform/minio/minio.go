package minio

import (
	"context"
	"fmt"
	"io"
	"log/slog"
	"net/url"
	"time"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
	"github.com/kalanara/cmc-backend/internal/config"
)

type Client struct {
	minioClient *minio.Client
	cfg         config.MinIOConfig
}

func NewClient(cfg config.MinIOConfig) (*Client, error) {
	client, err := minio.New(cfg.Endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(cfg.AccessKeyID, cfg.SecretAccessKey, ""),
		Secure: cfg.UseSSL,
	})
	if err != nil {
		return nil, fmt.Errorf("failed to initialize MinIO client: %w", err)
	}

	m := &Client{
		minioClient: client,
		cfg:         cfg,
	}

	ctx, cancel := context.WithTimeout(context.Background(), cfg.Timeout)
	defer cancel()

	exists, err := client.BucketExists(ctx, cfg.BucketName)
	if err != nil {
		slog.Warn("Failed to check if MinIO bucket exists", "bucket", cfg.BucketName, "error", err)
	} else if !exists {
		err = client.MakeBucket(ctx, cfg.BucketName, minio.MakeBucketOptions{Region: cfg.Location})
		if err != nil {
			slog.Warn("Failed to create default MinIO bucket", "bucket", cfg.BucketName, "error", err)
		} else {
			slog.Info("MinIO bucket initialized successfully", "bucket", cfg.BucketName)
		}
	}

	return m, nil
}

func (m *Client) UploadFile(ctx context.Context, objectName string, reader io.Reader, size int64, contentType string) (string, error) {
	ctxTimeout, cancel := context.WithTimeout(ctx, m.cfg.Timeout)
	defer cancel()

	info, err := m.minioClient.PutObject(ctxTimeout, m.cfg.BucketName, objectName, reader, size, minio.PutObjectOptions{
		ContentType: contentType,
	})
	if err != nil {
		return "", fmt.Errorf("failed to upload object %s to MinIO: %w", objectName, err)
	}

	slog.Debug("MinIO object uploaded", "object", objectName, "size", info.Size)
	return fmt.Sprintf("%s/%s/%s", m.cfg.Endpoint, m.cfg.BucketName, objectName), nil
}

func (m *Client) GetPresignedURL(ctx context.Context, objectName string, expiry time.Duration) (*url.URL, error) {
	ctxTimeout, cancel := context.WithTimeout(ctx, m.cfg.Timeout)
	defer cancel()

	reqParams := make(url.Values)
	return m.minioClient.PresignedGetObject(ctxTimeout, m.cfg.BucketName, objectName, expiry, reqParams)
}

func (m *Client) Ping(ctx context.Context) error {
	ctxTimeout, cancel := context.WithTimeout(ctx, m.cfg.Timeout)
	defer cancel()

	_, err := m.minioClient.ListBuckets(ctxTimeout)
	if err != nil {
		return fmt.Errorf("MinIO ping failed: %w", err)
	}
	return nil
}
