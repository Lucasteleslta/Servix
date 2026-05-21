CREATE TABLE reviews (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id  UUID        NOT NULL UNIQUE REFERENCES service_requests (id),
    reviewer_id UUID        NOT NULL REFERENCES users (id),
    reviewee_id UUID        NOT NULL REFERENCES users (id),
    rating      SMALLINT    NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment     TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reviews_reviewee_id ON reviews (reviewee_id);
CREATE INDEX idx_reviews_reviewer_id ON reviews (reviewer_id);
