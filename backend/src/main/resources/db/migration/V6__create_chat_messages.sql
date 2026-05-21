CREATE TABLE chat_messages (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id  UUID        NOT NULL REFERENCES service_requests (id) ON DELETE CASCADE,
    sender_id   UUID        NOT NULL REFERENCES users (id),
    receiver_id UUID        NOT NULL REFERENCES users (id),
    content     TEXT        NOT NULL,
    type        VARCHAR(20) NOT NULL DEFAULT 'TEXT',
    read_at     TIMESTAMPTZ,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_messages_request_id ON chat_messages (request_id);
CREATE INDEX idx_messages_sender_id  ON chat_messages (sender_id);
CREATE INDEX idx_messages_read_at    ON chat_messages (read_at) WHERE read_at IS NULL;
