CREATE TABLE service_requests (
    id           UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id    UUID         NOT NULL REFERENCES users (id),
    provider_id  UUID                  REFERENCES users (id),
    title        VARCHAR(200) NOT NULL,
    description  TEXT         NOT NULL,
    category     VARCHAR(50)  NOT NULL,
    status       VARCHAR(30)  NOT NULL DEFAULT 'PENDING',
    scheduled_at TIMESTAMPTZ,
    address      VARCHAR(300),
    latitude     DOUBLE PRECISION,
    longitude    DOUBLE PRECISION,
    budget_min   NUMERIC(10,2),
    budget_max   NUMERIC(10,2),
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_requests_client_id   ON service_requests (client_id);
CREATE INDEX idx_requests_provider_id ON service_requests (provider_id);
CREATE INDEX idx_requests_status      ON service_requests (status);
CREATE INDEX idx_requests_category    ON service_requests (category);
