CREATE TABLE proposals (
    id                 UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id         UUID         NOT NULL REFERENCES service_requests (id) ON DELETE CASCADE,
    provider_id        UUID         NOT NULL REFERENCES users (id),
    price              NUMERIC(10,2) NOT NULL,
    estimated_duration VARCHAR(100),
    message            TEXT,
    status             VARCHAR(20)  NOT NULL DEFAULT 'PENDING',
    created_at         TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at         TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    UNIQUE (request_id, provider_id)
);

CREATE INDEX idx_proposals_request_id  ON proposals (request_id);
CREATE INDEX idx_proposals_provider_id ON proposals (provider_id);
CREATE INDEX idx_proposals_status      ON proposals (status);
