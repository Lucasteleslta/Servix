CREATE TABLE favorites (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id   UUID        NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    provider_id UUID        NOT NULL REFERENCES providers (id) ON DELETE CASCADE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (client_id, provider_id)
);

CREATE INDEX idx_favorites_client_id ON favorites (client_id);
