CREATE TABLE providers (
    id              UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID         NOT NULL UNIQUE REFERENCES users (id) ON DELETE CASCADE,
    category        VARCHAR(50)  NOT NULL,
    description     TEXT,
    hourly_rate     NUMERIC(10,2),
    rating          NUMERIC(3,2) NOT NULL DEFAULT 0,
    total_reviews   INTEGER      NOT NULL DEFAULT 0,
    latitude        DOUBLE PRECISION,
    longitude       DOUBLE PRECISION,
    is_available    BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_providers_user_id   ON providers (user_id);
CREATE INDEX idx_providers_category  ON providers (category);
CREATE INDEX idx_providers_available ON providers (is_available);
CREATE INDEX idx_providers_location  ON providers (latitude, longitude)
    WHERE latitude IS NOT NULL AND longitude IS NOT NULL;
